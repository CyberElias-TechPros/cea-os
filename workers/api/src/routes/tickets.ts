import { Hono } from 'hono';
import { getDb, supportTickets, ticketMessages } from '@cea/db';
import { eq, and, asc, desc } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware } from '../middleware/auth';
import { sendNotification } from '../services/notification';

export const ticketsRouter = new Hono<Env>();

ticketsRouter.get('/', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const { status, priority, assigned } = c.req.query();
  const conditions: any[] = [sql`deleted_at IS NULL`];
  if (status) conditions.push(eq(supportTickets.status, status as any));
  if (priority) conditions.push(eq(supportTickets.priority, priority as any));
  if (assigned === 'me') conditions.push(eq(supportTickets.assigneeId, userId));
  const items = await db.select().from(supportTickets).where(and(...conditions)).orderBy(desc(supportTickets.createdAt));
  return c.json({ success: true, data: items });
});

ticketsRouter.get('/my', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const items = await db.select().from(supportTickets).where(and(sql`deleted_at IS NULL`, eq(supportTickets.requesterId, userId))).orderBy(desc(supportTickets.createdAt));
  return c.json({ success: true, data: items });
});

ticketsRouter.get('/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const [ticket] = await db.select().from(supportTickets).where(eq(supportTickets.id, c.req.param('id'))).limit(1);
  if (!ticket) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Ticket not found' } }, 404);
  const messages = await db.select().from(ticketMessages).where(eq(ticketMessages.ticketId, ticket.id)).orderBy(asc(ticketMessages.createdAt));
  return c.json({ success: true, data: { ...ticket, messages } });
});

ticketsRouter.post('/', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();
  const [ticket] = await db.insert(supportTickets).values({ ...body, requesterId: userId }).returning();

  if (ticket!.assigneeId) {
    await sendNotification(c.env, {
      userId: ticket!.assigneeId,
      title: 'New Support Ticket',
      body: ticket!.title,
      category: 'system',
      actionUrl: `/dashboard/tickets/${ticket!.id}`,
      icon: 'ticket',
    });
  }

  return c.json({ success: true, data: ticket }, 201);
});

ticketsRouter.patch('/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  await db.update(supportTickets).set({ ...body, updatedAt: new Date().toISOString() }).where(eq(supportTickets.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Ticket updated' } });
});

ticketsRouter.post('/:id/messages', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();
  const [msg] = await db.insert(ticketMessages).values({ ticketId: c.req.param('id'), userId, ...body }).returning();
  const ticketId = c.req.param('id');
  if (body.isInternal) {
    await db.update(supportTickets).set({ updatedAt: new Date().toISOString() }).where(eq(supportTickets.id, ticketId));
  } else {
    await db.update(supportTickets).set({ status: 'in_progress', updatedAt: new Date().toISOString() }).where(eq(supportTickets.id, ticketId));
  }

  const [ticket] = await db.select().from(supportTickets).where(eq(supportTickets.id, ticketId)).limit(1);
  const otherUserId = ticket!.requesterId === userId ? ticket!.assigneeId : ticket!.requesterId;
  if (otherUserId) {
    await sendNotification(c.env, {
      userId: otherUserId,
      title: 'New Message on Ticket',
      body: ticket!.title,
      category: 'system',
      actionUrl: `/dashboard/tickets/${ticketId}`,
      icon: 'message-circle',
    });
  }

  return c.json({ success: true, data: msg }, 201);
});

ticketsRouter.post('/:id/resolve', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const ticketId = c.req.param('id');
  await db.update(supportTickets).set({ status: 'resolved', resolvedAt: new Date().toISOString(), updatedAt: new Date().toISOString() }).where(eq(supportTickets.id, ticketId));

  const [ticket] = await db.select().from(supportTickets).where(eq(supportTickets.id, ticketId)).limit(1);
  if (ticket!.requesterId) {
    await sendNotification(c.env, {
      userId: ticket!.requesterId,
      title: 'Ticket Resolved',
      body: ticket!.title,
      category: 'system',
      actionUrl: `/dashboard/tickets/${ticketId}`,
      icon: 'check-circle',
    });
  }

  return c.json({ success: true, data: { message: 'Ticket resolved' } });
});
