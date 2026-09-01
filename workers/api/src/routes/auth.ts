import { Hono } from 'hono';
import { sign, verify } from 'jsonwebtoken';
import { hashPassword, verifyPassword } from '../lib/password';
import { getDb } from '@cea/db';
import { users, sessions, userRoles, roles, rolePermissions, permissions } from '@cea/db';
import { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema } from '@cea/validators';
import { eq, inArray } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware } from '../middleware/auth';

export const authRouter = new Hono<Env>();

type Db = ReturnType<typeof getDb>;

const ACCESS_TOKEN_TTL = '15m';
const REFRESH_TOKEN_TTL = '7d';

async function loadPermissionStrings(db: Db, roleIds: string[]): Promise<{ roles: string[]; permissions: string[] }> {
  if (roleIds.length === 0) return { roles: [], permissions: [] };
  const rolesData = await db.select().from(roles).where(inArray(roles.id, roleIds));
  const roleSlugs = rolesData.map((r) => r.slug);
  const perms = await db.select({
    resource: permissions.resource,
    action: permissions.action,
  }).from(rolePermissions)
    .innerJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
    .where(inArray(rolePermissions.roleId, roleIds));
  const permissionStrings = perms.map((p) => `${p.resource}.${p.action}`);
  if (roleSlugs.includes('admin')) permissionStrings.push('admin.*');
  return { roles: roleSlugs, permissions: permissionStrings };
}

/** Serialize a user row into the safe shape returned to clients. */
function safeUser(user: {
  id: string; email: string; firstName: string; lastName: string; phone: string | null;
  avatarUrl: string | null; roles?: string[];
}) {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    avatarUrl: user.avatarUrl,
    roles: user.roles ?? [],
  };
}

/**
 * Minimal KV-backed fixed-window rate limiter. Fails open if KV is unavailable
 * so a storage outage never takes the whole API down.
 */
async function rateLimit(c: { env: Env['Bindings'] }, key: string, max: number, windowSec: number): Promise<boolean> {
  try {
    const kv = c.env.CACHE_KV;
    const bucket = Math.floor(Date.now() / 1000 / windowSec);
    const k = `rl:${key}:${bucket}`;
    const current = Number((await kv.get(k)) ?? 0);
    if (current >= max) return false;
    await kv.put(k, String(current + 1), { expirationTtl: windowSec + 5 });
    return true;
  } catch (err) {
    console.warn('[rate-limit] KV unavailable, allowing request:', err);
    return true;
  }
}

const clientIp = (c: { req: { header(name: string): string | undefined } }) =>
  c.req.header('CF-Connecting-IP') ?? c.req.header('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

function issueSessionTokens(userId: string, roles: string[], permissions: string[], secret: string) {
  const accessToken = sign(
    { sub: userId, roles, permissions, jti: crypto.randomUUID() },
    secret,
    { expiresIn: ACCESS_TOKEN_TTL },
  );
  const refreshToken = sign(
    { sub: userId, type: 'refresh', jti: crypto.randomUUID() },
    secret,
    { expiresIn: REFRESH_TOKEN_TTL },
  );
  return { accessToken, refreshToken };
}

async function persistSession(db: Db, userId: string, accessToken: string, refreshToken: string, c: { req: { header(name: string): string | undefined } }) {
  await db.insert(sessions).values({
    userId,
    token: accessToken,
    refreshToken,
    ipAddress: clientIp(c),
    userAgent: c.req.header('user-agent'),
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    refreshExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
}

authRouter.post('/register', async (c) => {
  if (!(await rateLimit(c, `register:${clientIp(c)}`, 5, 3600))) {
    return c.json({ success: false, error: { code: 'RATE_LIMITED', message: 'Too many registration attempts. Try again later.' } }, 429);
  }

  const body = await c.req.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: { code: 'VALIDATION_ERROR', message: parsed.error.flatten() } }, 422);
  }

  const db = getDb(c.env.DB);

  const existing = await db.select().from(users).where(eq(users.email, parsed.data.email)).limit(1);
  if (existing.length > 0) {
    return c.json({ success: false, error: { code: 'CONFLICT', message: 'Email already registered' } }, 409);
  }

  const passwordHash = await hashPassword(parsed.data.password);
  const inserted = await db.insert(users).values({
    email: parsed.data.email,
    passwordHash,
    firstName: parsed.data.firstName,
    lastName: parsed.data.lastName,
    phone: parsed.data.phone ?? null,
  }).returning();
  const user = inserted[0]!;

  const defaultRole = await db.select().from(roles).where(eq(roles.slug, 'student')).limit(1);
  if (defaultRole.length > 0) {
    await db.insert(userRoles).values({ userId: user.id, roleId: defaultRole[0]!.id, scopeType: 'global' });
  }

  const { roles: roleSlugs, permissions: permStrings } = await loadPermissionStrings(db, defaultRole.length > 0 ? [defaultRole[0]!.id] : []);
  const { accessToken, refreshToken } = issueSessionTokens(user.id, roleSlugs, permStrings, c.env.JWT_SECRET);
  await persistSession(db, user.id, accessToken, refreshToken, c);

  return c.json({
    success: true,
    data: { user: safeUser({ ...user, roles: roleSlugs }), accessToken, refreshToken },
  }, 201);
});

authRouter.post('/login', async (c) => {
  if (!(await rateLimit(c, `login:${clientIp(c)}`, 10, 60))) {
    return c.json({ success: false, error: { code: 'RATE_LIMITED', message: 'Too many login attempts. Try again shortly.' } }, 429);
  }

  const body = await c.req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: { code: 'VALIDATION_ERROR', message: parsed.error.flatten() } }, 422);
  }

  const db = getDb(c.env.DB);
  const [user] = await db.select().from(users).where(eq(users.email, parsed.data.email)).limit(1);

  // Constant-ish behaviour to reduce user-enumeration timing signal.
  if (!user || !user.passwordHash) {
    return c.json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } }, 401);
  }

  if (user.status !== 'active') {
    return c.json({ success: false, error: { code: 'ACCOUNT_LOCKED', message: `Account is ${user.status}` } }, 403);
  }

  if (user.lockoutUntil && user.lockoutUntil > new Date()) {
    return c.json({ success: false, error: { code: 'ACCOUNT_LOCKED', message: 'Account temporarily locked. Try again later.' } }, 423);
  }

  const valid = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!valid) {
    const attempts = (user.loginAttempts ?? 0) + 1;
    const updates: Record<string, unknown> = { loginAttempts: attempts };
    if (attempts >= 5) {
      updates.lockoutUntil = new Date(Date.now() + 15 * 60 * 1000);
    }
    await db.update(users).set(updates).where(eq(users.id, user.id));
    return c.json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } }, 401);
  }

  await db.update(users).set({
    loginAttempts: 0,
    lockoutUntil: null,
    lastLoginAt: new Date(),
    lastLoginIp: clientIp(c),
  }).where(eq(users.id, user.id));

  const userRolesResult = await db.select().from(userRoles).where(eq(userRoles.userId, user.id));
  const roleIds = userRolesResult.map((ur) => ur.roleId);
  const { roles: roleSlugs, permissions: permStrings } = await loadPermissionStrings(db, roleIds);

  const { accessToken, refreshToken } = issueSessionTokens(user.id, roleSlugs, permStrings, c.env.JWT_SECRET);
  await persistSession(db, user.id, accessToken, refreshToken, c);

  return c.json({
    success: true,
    data: { user: safeUser({ ...user, roles: roleSlugs }), accessToken, refreshToken },
  });
});

authRouter.post('/refresh', async (c) => {
  const body = await c.req.json().catch(() => null) as { refreshToken?: string } | null;
  const rt = body?.refreshToken;
  if (!rt || typeof rt !== 'string') {
    return c.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Refresh token required' } }, 422);
  }

  try {
    const payload = verify(rt, c.env.JWT_SECRET) as { sub: string; type: string };
    if (payload.type !== 'refresh') {
      return c.json({ success: false, error: { code: 'INVALID_TOKEN', message: 'Invalid refresh token' } }, 401);
    }

    const db = getDb(c.env.DB);

    // The refresh token must correspond to a live, non-revoked session.
    const [session] = await db.select().from(sessions).where(eq(sessions.refreshToken, rt)).limit(1);
    if (!session || session.revokedAt) {
      return c.json({ success: false, error: { code: 'INVALID_TOKEN', message: 'Refresh token revoked' } }, 401);
    }

    const [user] = await db.select().from(users).where(eq(users.id, payload.sub)).limit(1);
    if (!user || user.status !== 'active') {
      return c.json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User not found or inactive' } }, 401);
    }

    const userRolesResult = await db.select().from(userRoles).where(eq(userRoles.userId, user.id));
    const roleIds = userRolesResult.map((ur) => ur.roleId);
    const { roles: roleSlugs, permissions: permStrings } = await loadPermissionStrings(db, roleIds);

    const { accessToken, refreshToken } = issueSessionTokens(user.id, roleSlugs, permStrings, c.env.JWT_SECRET);

    // Rotate: revoke the old session, persist the new pair.
    await db.update(sessions).set({ revokedAt: new Date() }).where(eq(sessions.id, session.id));
    await persistSession(db, user.id, accessToken, refreshToken, c);

    return c.json({ success: true, data: { accessToken, refreshToken } });
  } catch {
    return c.json({ success: false, error: { code: 'INVALID_TOKEN', message: 'Invalid or expired refresh token' } }, 401);
  }
});

authRouter.get('/me', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!user || user.deletedAt) {
    return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'User not found' } }, 404);
  }

  const userRolesResult = await db.select().from(userRoles).where(eq(userRoles.userId, user.id));
  const roleIds = userRolesResult.map((ur) => ur.roleId);
  const { roles } = await loadPermissionStrings(db, roleIds);
  return c.json({ success: true, data: { user: safeUser({ ...user, roles }) } });
});

authRouter.post('/logout', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const authHeader = c.req.header('Authorization');
  const token = authHeader?.slice(7);

  if (token) {
    await db.update(sessions).set({ revokedAt: new Date() }).where(eq(sessions.token, token));
  }

  return c.json({ success: true, data: { message: 'Logged out successfully' } });
});

authRouter.post('/forgot-password', async (c) => {
  if (!(await rateLimit(c, `forgot:${clientIp(c)}`, 5, 3600))) {
    return c.json({ success: false, error: { code: 'RATE_LIMITED', message: 'Too many requests. Try again later.' } }, 429);
  }

  const body = await c.req.json().catch(() => null);
  const parsed = forgotPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: { code: 'VALIDATION_ERROR', message: parsed.error.flatten() } }, 422);
  }

  const db = getDb(c.env.DB);
  const [user] = await db.select().from(users).where(eq(users.email, parsed.data.email)).limit(1);

  // Always return success to avoid account enumeration. Only act if the user exists.
  if (user) {
    const resetToken = sign({ sub: user.id, type: 'password_reset', jti: crypto.randomUUID() }, c.env.JWT_SECRET, { expiresIn: '1h' });
    const resetUrl = `${c.env.APP_URL || 'http://localhost:3000'}/reset-password?token=${encodeURIComponent(resetToken)}`;
    try {
      await c.env.EMAIL_QUEUE.send({
        to: user.email,
        subject: 'Reset your Cyber Elias Academy password',
        html: `Hello ${user.firstName},<br/><br/>We received a request to reset your password. Click the link below to choose a new password (valid for 1 hour):<br/><br/><a href="${resetUrl}">${resetUrl}</a><br/><br/>If you did not request this, you can safely ignore this email.`,
        templateKey: 'password_reset',
      });
    } catch (err) {
      console.error('[forgot-password] failed to enqueue email:', err);
    }
  }

  return c.json({ success: true, data: { message: 'If that email exists, a reset link has been sent.' } });
});

authRouter.post('/reset-password', async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = resetPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: { code: 'VALIDATION_ERROR', message: parsed.error.flatten() } }, 422);
  }

  try {
    const payload = verify(parsed.data.token, c.env.JWT_SECRET) as { sub: string; type: string };
    if (payload.type !== 'password_reset') {
      return c.json({ success: false, error: { code: 'INVALID_TOKEN', message: 'Invalid reset token' } }, 401);
    }

    const db = getDb(c.env.DB);
    const passwordHash = await hashPassword(parsed.data.password);
    await db.update(users).set({ passwordHash, loginAttempts: 0, lockoutUntil: null }).where(eq(users.id, payload.sub));

    // Invalidate all existing sessions for this user after a password change.
    await db.update(sessions).set({ revokedAt: new Date() }).where(eq(sessions.userId, payload.sub));

    return c.json({ success: true, data: { message: 'Password updated. Please sign in.' } });
  } catch {
    return c.json({ success: false, error: { code: 'INVALID_TOKEN', message: 'Invalid or expired reset token' } }, 401);
  }
});
