import { Hono } from 'hono';
import { getDb, rooms, roomBookings, workOrders, users, type WorkOrder } from '@cea/db';
import { eq, and, or, asc, desc, gte, lte, inArray } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware, requirePermission } from '../middleware/auth';

export const facilitiesRouter = new Hono<Env>();

// --- Rooms ---
facilitiesRouter.get('/rooms', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(rooms).orderBy(asc(rooms.name));
  return c.json({ success: true, data: items });
});

facilitiesRouter.post('/rooms', authMiddleware, requirePermission('inventory', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [room] = await db.insert(rooms).values(body).returning();
  return c.json({ success: true, data: room }, 201);
});

facilitiesRouter.patch('/rooms/:id', authMiddleware, requirePermission('inventory', 'update'), async (c) => {
  const db = getDb(c.env.DB);
  const [room] = await db.update(rooms).set({ ...await c.req.json(), updatedAt: new Date().toISOString() }).where(eq(rooms.id, c.req.param('id'))).returning();
  return c.json({ success: true, data: room });
});

// --- Bookings ---
facilitiesRouter.get('/bookings', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const { mine } = c.req.query();
  const conditions: any[] = [];
  if (mine === 'true') conditions.push(eq(roomBookings.bookerId, userId));
  const items = await db.select().from(roomBookings)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(roomBookings.startTime));
  const roomIds = [...new Set(items.map((b) => b.roomId))];
  const roomMap: Record<string, string> = {};
  if (roomIds.length > 0) {
    const found = await db.select({ id: rooms.id, name: rooms.name }).from(rooms).where(inArray(rooms.id, roomIds));
    for (const r of found) roomMap[r.id] = r.name;
  }
  return c.json({ success: true, data: items.map((b) => ({ ...b, roomName: roomMap[b.roomId] ?? 'Unknown room' })) });
});

facilitiesRouter.post('/bookings', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();
  if (!body.roomId || !body.startTime || !body.endTime || !body.title) {
    return c.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'roomId, title, startTime and endTime are required' } }, 422);
  }
  if (new Date(body.endTime) <= new Date(body.startTime)) {
    return c.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'endTime must be after startTime' } }, 422);
  }
  const [room] = await db.select().from(rooms).where(eq(rooms.id, body.roomId)).limit(1);
  if (!room) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Room not found' } }, 404);
  const clash = await db.select({ id: roomBookings.id }).from(roomBookings)
    .where(and(
      eq(roomBookings.roomId, body.roomId),
      or(eq(roomBookings.status, 'approved'), eq(roomBookings.status, 'pending')),
      lte(roomBookings.startTime, body.endTime),
      gte(roomBookings.endTime, body.startTime),
    )).limit(1);
  if (clash.length > 0) {
    return c.json({ success: false, error: { code: 'CONFLICT', message: 'Room is already booked for that time slot' } }, 409);
  }
  const [booking] = await db.insert(roomBookings).values({ ...body, bookerId: userId }).returning();
  return c.json({ success: true, data: booking }, 201);
});

facilitiesRouter.patch('/bookings/:id/status', authMiddleware, requirePermission('inventory', 'update'), async (c) => {
  const db = getDb(c.env.DB);
  const { status } = await c.req.json<{ status: 'pending' | 'approved' | 'declined' | 'cancelled' | 'completed' }>();
  if (!['pending', 'approved', 'declined', 'cancelled', 'completed'].includes(status)) {
    return c.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid status' } }, 422);
  }
  await db.update(roomBookings).set({ status }).where(eq(roomBookings.id, c.req.param('id')));
  return c.json({ success: true, data: { message: `Booking ${status}` } });
});

// --- Work orders ---
facilitiesRouter.get('/work-orders', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const { status } = c.req.query();
  const conditions: any[] = [];
  if (status) conditions.push(eq(workOrders.status, status as NonNullable<WorkOrder['status']>));
  const items = await db.select().from(workOrders)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(workOrders.createdAt));
  const userIds = [...new Set(items.map((w) => w.reportedById))];
  const userMap: Record<string, string> = {};
  if (userIds.length > 0) {
    const found = await db.select({ id: users.id, firstName: users.firstName, lastName: users.lastName }).from(users).where(inArray(users.id, userIds));
    for (const u of found) userMap[u.id] = `${u.firstName} ${u.lastName}`;
  }
  return c.json({ success: true, data: items.map((w) => ({ ...w, reportedBy: userMap[w.reportedById] ?? 'Unknown' })) });
});

facilitiesRouter.post('/work-orders', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();
  if (!body.title) {
    return c.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Title is required' } }, 422);
  }
  const [order] = await db.insert(workOrders).values({ ...body, reportedById: userId }).returning();
  return c.json({ success: true, data: order }, 201);
});

facilitiesRouter.patch('/work-orders/:id', authMiddleware, requirePermission('inventory', 'update'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const updates: Record<string, unknown> = { ...body, updatedAt: new Date().toISOString() };
  if (body.status === 'resolved' || body.status === 'closed') updates.resolvedAt = new Date().toISOString();
  const [order] = await db.update(workOrders).set(updates).where(eq(workOrders.id, c.req.param('id'))).returning();
  return c.json({ success: true, data: order });
});
