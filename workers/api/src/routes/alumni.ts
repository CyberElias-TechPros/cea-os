import { Hono } from 'hono';
import { getDb, alumniProfiles, users, placements } from '@cea/db';
import { eq, isNull } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware, requirePermission } from '../middleware/auth';

export const alumniRouter = new Hono<Env>();

alumniRouter.post('/profile', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();

  const existing = await db.select().from(alumniProfiles).where(eq(alumniProfiles.userId, userId)).limit(1);
  if (existing.length > 0) {
    await db.update(alumniProfiles).set(body).where(eq(alumniProfiles.userId, userId));
    return c.json({ success: true, data: { message: 'Profile updated' } });
  }

  const [profile] = await db.insert(alumniProfiles).values({ userId, ...body }).returning();
  return c.json({ success: true, data: profile }, 201);
});

alumniRouter.get('/profile', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const [profile] = await db.select().from(alumniProfiles).where(eq(alumniProfiles.userId, userId)).limit(1);
  if (!profile) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Profile not found' } }, 404);
  return c.json({ success: true, data: profile });
});

alumniRouter.get('/directory', async (c) => {
  const db = getDb(c.env.DB);
  const profiles = await db.select().from(alumniProfiles).where(eq(alumniProfiles.isVisible, true));

  const data = await Promise.all(profiles.map(async (p) => {
    const [user] = await db.select({
      id: users.id, firstName: users.firstName, lastName: users.lastName, avatarUrl: users.avatarUrl,
    }).from(users).where(eq(users.id, p.userId)).limit(1);
    return { ...p, user };
  }));

  return c.json({ success: true, data });
});

alumniRouter.get('/mentors', async (c) => {
  const db = getDb(c.env.DB);
  const mentors = await db.select().from(alumniProfiles).where(eq(alumniProfiles.isMentor, true));

  const data = await Promise.all(mentors.map(async (p) => {
    const [user] = await db.select({
      id: users.id, firstName: users.firstName, lastName: users.lastName, avatarUrl: users.avatarUrl,
    }).from(users).where(eq(users.id, p.userId)).limit(1);
    return { ...p, user };
  }));

  return c.json({ success: true, data });
});

alumniRouter.post('/placements', authMiddleware, requirePermission('placements', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [placement] = await db.insert(placements).values(body).returning();
  return c.json({ success: true, data: placement }, 201);
});

alumniRouter.get('/placements', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(placements).orderBy(placements.placementDate);
  return c.json({ success: true, data: items });
});

alumniRouter.get('/placements/stats', authMiddleware, requirePermission('analytics', 'read'), async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(placements);
  const total = items.length;
  const byType: Record<string, number> = {};
  for (const p of items) {
    const type = p.type ?? 'job';
    byType[type] = (byType[type] ?? 0) + 1;
  }
  return c.json({ success: true, data: { total, byType } });
});
