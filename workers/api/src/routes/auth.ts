import { Hono } from 'hono';
import { sign, verify } from 'jsonwebtoken';
import { hashPassword, verifyPassword } from '../lib/password';
import { getDb } from '@cea/db';
import { users, sessions, userRoles, roles, rolePermissions, permissions } from '@cea/db';
import { loginSchema, registerSchema } from '@cea/validators';
import { eq, inArray } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware } from '../middleware/auth';

export const authRouter = new Hono<Env>();

type Db = ReturnType<typeof getDb>;

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

authRouter.post('/register', async (c) => {
  const body = await c.req.json();
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
    phone: parsed.data.phone,
  }).returning();
  const user = inserted[0]!;

  const defaultRole = await db.select().from(roles).where(eq(roles.slug, 'student')).limit(1);
  if (defaultRole.length > 0) {
    await db.insert(userRoles).values({ userId: user.id, roleId: defaultRole[0]!.id, scopeType: 'global' });
  }

  const { roles: roleSlugs, permissions: permStrings } = await loadPermissionStrings(db, defaultRole.length > 0 ? [defaultRole[0]!.id] : [],
  );
  const token = sign({ sub: user.id, roles: roleSlugs, permissions: permStrings, jti: crypto.randomUUID() }, c.env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = sign({ sub: user.id, type: 'refresh', jti: crypto.randomUUID() }, c.env.JWT_SECRET, { expiresIn: '7d' });

  await db.insert(sessions).values({
    userId: user.id,
    token,
    refreshToken,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    refreshExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return c.json({
    success: true,
    data: { user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }, token, refreshToken },
  }, 201);
});

authRouter.post('/login', async (c) => {
  const body = await c.req.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ success: false, error: { code: 'VALIDATION_ERROR', message: parsed.error.flatten() } }, 422);
  }

  const db = getDb(c.env.DB);
  const [user] = await db.select().from(users).where(eq(users.email, parsed.data.email)).limit(1);

  if (!user || !user.passwordHash) {
    return c.json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } }, 401);
  }

  if (user.status !== 'active') {
    return c.json({ success: false, error: { code: 'ACCOUNT_LOCKED', message: `Account is ${user.status}` } }, 403);
  }

  if (user.lockoutUntil && user.lockoutUntil > new Date()) {
    return c.json({ success: false, error: { code: 'ACCOUNT_LOCKED', message: 'Account temporarily locked. Try again later.' } }, 423);
  }

  const valid = await verifyPassword(parsed.data.password, user.passwordHash ?? '');
  if (!valid) {
    const attempts = (user.loginAttempts ?? 0) + 1;
    const updates: Partial<typeof user> = { loginAttempts: attempts };
    if (attempts >= 5) {
      updates.lockoutUntil = new Date(Date.now() + 15 * 60 * 1000);
    }
    await db.update(users).set(updates).where(eq(users.id, user.id));
    return c.json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } }, 401);
  }

  await db.update(users).set({ loginAttempts: 0, lockoutUntil: null, lastLoginAt: new Date(), lastLoginIp: c.req.header('CF-Connecting-IP') }).where(eq(users.id, user.id));

  const userRolesResult = await db.select().from(userRoles).where(eq(userRoles.userId, user.id));
  const roleIds = userRolesResult.map((ur) => ur.roleId);
  const { roles: roleSlugs, permissions: permStrings } = await loadPermissionStrings(db, roleIds);

  const token = sign({ sub: user.id, roles: roleSlugs, permissions: permStrings, jti: crypto.randomUUID() }, c.env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = sign({ sub: user.id, type: 'refresh', jti: crypto.randomUUID() }, c.env.JWT_SECRET, { expiresIn: '7d' });

  await db.insert(sessions).values({
    userId: user.id,
    token,
    refreshToken,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    refreshExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return c.json({
    success: true,
    data: {
      user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, roles: roleSlugs },
      token,
      refreshToken,
    },
  });
});

authRouter.post('/refresh', async (c) => {
  const { refreshToken: rt } = await c.req.json<{ refreshToken: string }>();
  if (!rt) {
    return c.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Refresh token required' } }, 422);
  }

  try {
    const payload = verify(rt, c.env.JWT_SECRET) as { sub: string; type: string };
    if (payload.type !== 'refresh') {
      return c.json({ success: false, error: { code: 'INVALID_TOKEN', message: 'Invalid refresh token' } }, 401);
    }

    const db = getDb(c.env.DB);
    const [user] = await db.select().from(users).where(eq(users.id, payload.sub)).limit(1);
    if (!user || user.status !== 'active') {
      return c.json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User not found or inactive' } }, 401);
    }

    const userRolesResult = await db.select().from(userRoles).where(eq(userRoles.userId, user.id));
    const roleIds = userRolesResult.map((ur) => ur.roleId);
    const { roles: roleSlugs, permissions: permStrings } = await loadPermissionStrings(db, roleIds);

    const newToken = sign({ sub: user.id, roles: roleSlugs, permissions: permStrings, jti: crypto.randomUUID() }, c.env.JWT_SECRET, { expiresIn: '15m' });
    const newRefreshToken = sign({ sub: user.id, type: 'refresh', jti: crypto.randomUUID() }, c.env.JWT_SECRET, { expiresIn: '7d' });

    return c.json({ success: true, data: { token: newToken, refreshToken: newRefreshToken } });
  } catch {
    return c.json({ success: false, error: { code: 'INVALID_TOKEN', message: 'Invalid or expired refresh token' } }, 401);
  }
});

authRouter.get('/me', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!user) {
    return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'User not found' } }, 404);
  }

  const userRolesResult = await db.select().from(userRoles).where(eq(userRoles.userId, user.id));
  const roleIds = userRolesResult.map((ur) => ur.roleId);
  const { roles } = await loadPermissionStrings(db, roleIds);
  const { passwordHash, twoFactorSecret, ...safeUser } = user;
  return c.json({ success: true, data: { ...safeUser, roles } });
});

authRouter.post('/logout', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const authHeader = c.req.header('Authorization');
  const token = authHeader?.slice(7);

  if (token) {
    await db.delete(sessions).where(eq(sessions.token, token));
  }

  return c.json({ success: true, data: { message: 'Logged out successfully' } });
});

