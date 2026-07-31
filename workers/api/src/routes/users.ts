import { Hono } from 'hono';
import { getDb } from '@cea/db';
import { users, userRoles, roles } from '@cea/db';
import { eq, inArray, isNull } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware, requirePermission } from '../middleware/auth';
import { audit } from '../middleware/audit';

export const usersRouter = new Hono<Env>();

usersRouter.get('/', authMiddleware, requirePermission('users', 'read'), async (c) => {
  const db = getDb(c.env.DB);
  const allUsers = await db.select({
    id: users.id,
    email: users.email,
    firstName: users.firstName,
    lastName: users.lastName,
    status: users.status,
    createdAt: users.createdAt,
  })    .from(users).where(isNull(users.deletedAt));

  return c.json({ success: true, data: allUsers });
});

usersRouter.get('/:id', authMiddleware, requirePermission('users', 'read'), async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.req.param('id');
  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);

  if (!user || user.deletedAt) {
    return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'User not found' } }, 404);
  }

  const userRolesResult = await db.select().from(userRoles).where(eq(userRoles.userId, user.id));
  const roleIds = userRolesResult.map((ur) => ur.roleId);
  const userRolesData = roleIds.length > 0 ? await db.select().from(roles).where(inArray(roles.id, roleIds)) : [];

  const { passwordHash, twoFactorSecret, ...safeUser } = user;
  return c.json({ success: true, data: { ...safeUser, roles: userRolesData } });
});

usersRouter.patch('/:id', authMiddleware, requirePermission('users', 'update'), audit('update', 'users'), async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.req.param('id');
  const body = await c.req.json();

  const allowed = ['firstName', 'lastName', 'phone', 'status', 'preferences', 'avatarUrl'];
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (body[key] !== undefined) updates[key] = body[key];
  }

  if (Object.keys(updates).length === 0) {
    return c.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'No valid fields to update' } }, 422);
  }

  await db.update(users).set(updates).where(eq(users.id, userId));
  return c.json({ success: true, data: { message: 'User updated' } });
});

usersRouter.delete('/:id', authMiddleware, requirePermission('users', 'delete'), audit('delete', 'users'), async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.req.param('id');
  await db.update(users).set({ deletedAt: new Date(), status: 'inactive' }).where(eq(users.id, userId));
  return c.json({ success: true, data: { message: 'User deactivated' } });
});
