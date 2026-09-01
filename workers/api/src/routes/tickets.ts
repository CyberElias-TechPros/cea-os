import { Hono } from 'hono';
import { getDb, supportTickets, ticketMessages } from '@cea/db';
import { eq, and, asc, desc } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware, STAFF_ROLES } from '../middleware/auth';
import { sendNotification } from '../services/notification';

export const ticketsRouter = new Hono<Env>();

const isStaff = (roles: string[]) => roles.some((r) => STAFF_ROLES.includes(r));

ticketsRouter.get('/', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const roles = c.get('userRoles');
  if (!isStaff(roles)) {
    return c.json({ success: false, error: { code: 'FORBIDDEN', message: 'Insufficient role' } }, 403);
  }
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
  const userId = c.get('userId');
  const roles = c.get('userRoles');
  const [ticket] = await db.select().from(supportTickets).where(eq(supportTickets.id, c.req.param('id'))).limit(1);
  if (!ticket) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Ticket not found' } }, 404);
  const canView = isStaff(roles) || ticket.requesterId === userId || ticket.assigneeId === userId;
  if (!canView) return c.json({ success: false, error: { code: 'FORBIDDEN', message: 'Not authorized' } }, 403);
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
  const userId = c.get('userId');
  const roles = c.get('userRoles');
  const body = await c.req.json();

  const [ticket] = await db.select().from(supportTickets).where(eq(supportTickets.id, c.req.param('id'))).limit(1);
  if (!ticket) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Ticket not found' } }, 404);

  const staff = isStaff(roles);
  const requester = ticket.requesterId === userId;
  if (!staff && !requester) {
    return c.json({ success: false, error: { code: 'FORBIDDEN', message: 'Not authorized' } }, 403);
  }

  let updates: Record<string, unknown> = { ...body, updatedAt: new Date().toISOString() };
  // Requesters may only edit description/title; staff manage status/assignee.
  if (!staff) {
    const { title, description } = body;
    updates = { title, description, updatedAt: new Date().toISOString() };
  }

  await db.update(supportTickets).set(updates).where(eq(supportTickets.id, ticket.id));
  return c.json({ success: true, data: { message: 'Ticket updated' } });
});

ticketsRouter.post('/:id/messages', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const roles = c.get('userRoles');
  const body = await c.req.json();
  const ticketId = c.req.param('id');

  const [ticket] = await db.select().from(supportTickets).where(eq(supportTickets.id, ticketId)).limit(1);
  if (!ticket) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Ticket not found' } }, 404);
  const participant = ticket.requesterId === userId || ticket.assigneeId === userId || isStaff(roles);
  if (!participant) return c.json({ success: false, error: { code: 'FORBIDDEN', message: 'Not authorized' } }, 403);

  // Only staff can leave internal notes.
  const isInternal = body.isInternal === true && isStaff(roles);
  const [msg] = await db.insert(ticketMessages).values({ ticketId, userId, ...body, isInternal }).returning();

  if (isInternal) {
    await db.update(supportTickets).set({ updatedAt: new Date().toISOString() }).where(eq(supportTickets.id, ticketId));
  } else {
    await db.update(supportTickets).set({ status: 'in_progress', updatedAt: new Date().toISOString() }).where(eq(supportTickets.id, ticketId));
  }

  const otherUserId = ticket.requesterId === userId ? ticket.assigneeId : ticket.requesterId;
  if (otherUserId && !isInternal) {
    await sendNotification(c.env, {
      userId: otherUserId,
      title: 'New Message on Ticket',
      body: ticket.title,
      category: 'system',
      actionUrl: `/dashboard/tickets/${ticketId}`,
      icon: 'message-circle',
    });
  }

  return c.json({ success: true, data: msg }, 201);
});

ticketsRouter.post('/:id/resolve', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const roles = c.get('userRoles');
  const ticketId = c.req.param('id');

  const [ticket] = await db.select().from(supportTickets).where(eq(supportTickets.id, ticketId)).limit(1);
  if (!ticket) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Ticket not found' } }, 404);
  const canResolve = isStaff(roles) || ticket.requesterId === userId;
  if (!canResolve) return c.json({ success: false, error: { code: 'FORBIDDEN', message: 'Not authorized' } }, 403);

  await db.update(supportTickets).set({ status: 'resolved', resolvedAt: new Date().toISOString(), updatedAt: new Date().toISOString() }).where(eq(supportTickets.id, ticketId));

  if (ticket.requesterId) {
    await sendNotification(c.env, {
      userId: ticket.requesterId,
      title: 'Ticket Resolved',
      body: ticket.title,
      category: 'system',
      actionUrl: `/dashboard/tickets/${ticketId}`,
      icon: 'check-circle',
    });
  }

  return c.json({ success: true, data: { message: 'Ticket resolved' } });
});
