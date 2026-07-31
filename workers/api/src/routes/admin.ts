import { Hono } from 'hono';
import { getDb } from '@cea/db';
import { users, roles, permissions, rolePermissions, userRoles, auditLogs } from '@cea/db';
import { eq, and, inArray, isNull, desc } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware, requirePermission } from '../middleware/auth';
import { permissionCatalog, defaultRoles } from '../lib/permissions';

export const adminRouter = new Hono<Env>();

adminRouter.post('/bootstrap', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const { email } = await c.req.json<{ email?: string }>();

  const created: string[] = [];
  const roleIds: Record<string, string> = {};

  for (const def of defaultRoles) {
    const existing = await db.select().from(roles).where(eq(roles.slug, def.slug)).limit(1);
    if (existing.length > 0) {
      roleIds[def.slug] = existing[0]!.id;
      continue;
    }
    const [role] = await db.insert(roles).values(def).returning();
    roleIds[def.slug] = role!.id;
    created.push(`role:${def.slug}`);
  }

  const permIds: Record<string, string> = {};
  for (const def of permissionCatalog) {
    const key = `${def.resource}.${def.action}`;
    const existing = await db.select().from(permissions).where(and(eq(permissions.resource, def.resource), eq(permissions.action, def.action))).limit(1);
    if (existing.length > 0) {
      permIds[key] = existing[0]!.id;
      continue;
    }
    const [perm] = await db.insert(permissions).values(def).returning();
    permIds[key] = perm!.id;
    created.push(`permission:${key}`);
  }

  const adminRoleId = roleIds['admin'];
  if (adminRoleId) {
    const linked = await db.select().from(rolePermissions).where(eq(rolePermissions.roleId, adminRoleId));
    const linkedPermIds = new Set(linked.map((l) => l.permissionId));
    for (const key of Object.keys(permIds)) {
      const pid = permIds[key]!;
      if (!linkedPermIds.has(pid)) {
        await db.insert(rolePermissions).values({ roleId: adminRoleId, permissionId: pid });
        created.push(`grant:admin.${key}`);
      }
    }
  }

  const targetId = email
    ? (await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1))[0]?.id
    : userId;
  if (targetId && adminRoleId) {
    const existingGrant = await db.select().from(userRoles).where(and(eq(userRoles.userId, targetId), eq(userRoles.roleId, adminRoleId))).limit(1);
    if (existingGrant.length === 0) {
      await db.insert(userRoles).values({ userId: targetId, roleId: adminRoleId, scopeType: 'global', assignedById: userId });
      created.push(`grant:user.${targetId}.admin`);
    }
  }

  return c.json({ success: true, data: { created, totalRoles: Object.keys(roleIds).length, totalPermissions: Object.keys(permIds).length } });
});

adminRouter.get('/roles', authMiddleware, requirePermission('users', 'read'), async (c) => {
  const db = getDb(c.env.DB);
  const allRoles = await db.select().from(roles).orderBy(desc(roles.hierarchy));
  const data = await Promise.all(allRoles.map(async (r) => {
    const perms = await db.select({ resource: permissions.resource, action: permissions.action })
      .from(rolePermissions)
      .innerJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
      .where(eq(rolePermissions.roleId, r.id));
    return { ...r, permissions: perms.map((p) => `${p.resource}.${p.action}`) };
  }));
  return c.json({ success: true, data });
});

adminRouter.get('/users', authMiddleware, requirePermission('users', 'read'), async (c) => {
  const db = getDb(c.env.DB);
  const allUsers = await db.select({
    id: users.id, email: users.email, firstName: users.firstName, lastName: users.lastName,
    status: users.status, createdAt: users.createdAt, lastLoginAt: users.lastLoginAt,
  }).from(users).where(isNull(users.deletedAt)).orderBy(desc(users.createdAt));

  const data = await Promise.all(allUsers.map(async (u) => {
    const assignments = await db.select().from(userRoles).where(eq(userRoles.userId, u.id));
    const ids = assignments.map((a) => a.roleId);
    const roleData = ids.length > 0 ? await db.select({ id: roles.id, name: roles.name, slug: roles.slug }).from(roles).where(inArray(roles.id, ids)) : [];
    return { ...u, roles: roleData };
  }));
  return c.json({ success: true, data });
});

adminRouter.patch('/users/:id/roles', authMiddleware, requirePermission('users', 'update'), async (c) => {
  const db = getDb(c.env.DB);
  const targetId = c.req.param('id');
  const adminId = c.get('userId');
  const { roleIds } = await c.req.json<{ roleIds: string[] }>();
  if (!Array.isArray(roleIds)) {
    return c.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'roleIds must be an array' } }, 422);
  }
  const valid = await db.select({ id: roles.id }).from(roles).where(inArray(roles.id, roleIds));
  const validIds = new Set(valid.map((r) => r.id));

  await db.delete(userRoles).where(eq(userRoles.userId, targetId));
  for (const roleId of roleIds) {
    if (validIds.has(roleId)) {
      await db.insert(userRoles).values({ userId: targetId, roleId, scopeType: 'global', assignedById: adminId });
    }
  }
  return c.json({ success: true, data: { message: 'Roles updated' } });
});

adminRouter.get('/audit', authMiddleware, requirePermission('users', 'read'), async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt)).limit(200);
  const userIds = [...new Set(items.map((i) => i.userId).filter(Boolean) as string[])];
  const userMap: Record<string, { firstName: string; lastName: string; email: string }> = {};
  if (userIds.length > 0) {
    const found = await db.select({ id: users.id, firstName: users.firstName, lastName: users.lastName, email: users.email })
      .from(users).where(inArray(users.id, userIds));
    for (const u of found) userMap[u.id] = u;
  }
  return c.json({ success: true, data: items.map((i) => ({ ...i, actor: i.userId ? userMap[i.userId] : null })) });
});
