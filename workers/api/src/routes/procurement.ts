import { Hono } from 'hono';
import { getDb, suppliers, purchaseOrders, purchaseOrderItems } from '@cea/db';
import { eq, and, desc, asc } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware, requirePermission } from '../middleware/auth';

export const procurementRouter = new Hono<Env>();

procurementRouter.get('/suppliers', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(suppliers).where(sql`deleted_at IS NULL`).orderBy(asc(suppliers.name));
  return c.json({ success: true, data: items });
});

procurementRouter.get('/suppliers/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const [s] = await db.select().from(suppliers).where(eq(suppliers.id, c.req.param('id'))).limit(1);
  if (!s) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Supplier not found' } }, 404);
  return c.json({ success: true, data: s });
});

procurementRouter.post('/suppliers', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [supplier] = await db.insert(suppliers).values(body).returning();
  return c.json({ success: true, data: supplier }, 201);
});

procurementRouter.patch('/suppliers/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  await db.update(suppliers).set({ ...body, updatedAt: new Date().toISOString() }).where(eq(suppliers.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Supplier updated' } });
});

procurementRouter.get('/orders', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(purchaseOrders).where(sql`deleted_at IS NULL`).orderBy(desc(purchaseOrders.createdAt));
  return c.json({ success: true, data: items });
});

procurementRouter.get('/orders/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const [po] = await db.select().from(purchaseOrders).where(eq(purchaseOrders.id, c.req.param('id'))).limit(1);
  if (!po) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Purchase order not found' } }, 404);
  const items = await db.select().from(purchaseOrderItems).where(eq(purchaseOrderItems.purchaseOrderId, po.id));
  return c.json({ success: true, data: { ...po, items } });
});

procurementRouter.post('/orders', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const { items, ...body } = await c.req.json();
  const poNumber = 'PO-' + Date.now().toString(36).toUpperCase();
  const [po] = await db.insert(purchaseOrders).values({ ...body, poNumber, createdById: userId }).returning();
  if (items?.length) {
    await db.insert(purchaseOrderItems).values(items.map((li: any) => ({ ...li, purchaseOrderId: po!.id })));
  }
  return c.json({ success: true, data: po! }, 201);
});

procurementRouter.post('/orders/:id/approve', authMiddleware, requirePermission('procurement', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  await db.update(purchaseOrders).set({ status: 'approved', approvedById: c.get('userId'), approvedAt: new Date().toISOString(), updatedAt: new Date().toISOString() }).where(eq(purchaseOrders.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'PO approved' } });
});

procurementRouter.post('/orders/:id/receive', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  await db.update(purchaseOrders).set({ status: 'received', receivedAt: new Date().toISOString(), updatedAt: new Date().toISOString() }).where(eq(purchaseOrders.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'PO received' } });
});
