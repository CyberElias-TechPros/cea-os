import { Hono } from 'hono';
import { getDb, notifications } from '@cea/db';
import { eq, and, sql } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware } from '../middleware/auth';

export const notificationsRouter = new Hono<Env>();

notificationsRouter.get('/', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const status = c.req.query('status') ?? 'unread';
  const limit = Math.min(Number(c.req.query('limit')) || 20, 100);

  const items = await db.select()
    .from(notifications)
    .where(and(eq(notifications.userId, userId), eq(notifications.status, status as NotificationStatus)))
    .orderBy(notifications.createdAt)
    .limit(limit);

  return c.json({ success: true, data: items });
});

notificationsRouter.patch('/:id/read', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const id = c.req.param('id');

  await db.update(notifications)
    .set({ status: 'read', readAt: new Date() })
    .where(and(eq(notifications.id, id), eq(notifications.userId, userId)));

  return c.json({ success: true, data: { message: 'Marked as read' } });
});

notificationsRouter.post('/mark-all-read', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');

  await db.update(notifications)
    .set({ status: 'read', readAt: new Date() })
    .where(and(eq(notifications.userId, userId), eq(notifications.status, 'unread')));

  return c.json({ success: true, data: { message: 'All marked as read' } });
});

notificationsRouter.get('/unread-count', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');

  const [result] = await db.select({ count: sql<number>`count(*)` })
    .from(notifications)
    .where(and(eq(notifications.userId, userId), eq(notifications.status, 'unread')));

  return c.json({ success: true, data: { count: result?.count ?? 0 } });
});

type NotificationStatus = 'unread' | 'read' | 'archived';
