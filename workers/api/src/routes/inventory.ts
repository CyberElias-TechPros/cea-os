import { Hono } from 'hono';
import { getDb, inventoryItems, assetTracking, stockMovements } from '@cea/db';
import { eq, and, desc, asc } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware, requirePermission } from '../middleware/auth';

export const inventoryRouter = new Hono<Env>();

inventoryRouter.get('/', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const { category, lowStock } = c.req.query();
  const conditions: any[] = [sql`deleted_at IS NULL`];
  if (category) conditions.push(eq(inventoryItems.category, category as any));
  if (lowStock === 'true') conditions.push(sql`quantity <= min_quantity`);
  const items = await db.select().from(inventoryItems).where(and(...conditions)).orderBy(asc(inventoryItems.name));
  return c.json({ success: true, data: items });
});

inventoryRouter.get('/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const [item] = await db.select().from(inventoryItems).where(eq(inventoryItems.id, c.req.param('id'))).limit(1);
  if (!item) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Item not found' } }, 404);
  const movements = await db.select().from(stockMovements).where(eq(stockMovements.inventoryItemId, item.id)).orderBy(desc(stockMovements.createdAt));
  return c.json({ success: true, data: { ...item, movements } });
});

inventoryRouter.post('/', authMiddleware, requirePermission('inventory', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [item] = await db.insert(inventoryItems).values(body).returning();
  return c.json({ success: true, data: item }, 201);
});

inventoryRouter.patch('/:id', authMiddleware, requirePermission('inventory', 'update'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  await db.update(inventoryItems).set({ ...body, updatedAt: new Date().toISOString() }).where(eq(inventoryItems.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Item updated' } });
});

inventoryRouter.delete('/:id', authMiddleware, requirePermission('inventory', 'delete'), async (c) => {
  const db = getDb(c.env.DB);
  await db.update(inventoryItems).set({ deletedAt: new Date().toISOString() }).where(eq(inventoryItems.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Item deleted' } });
});

inventoryRouter.post('/:id/movement', authMiddleware, requirePermission('inventory', 'update'), async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();
  const [movement] = await db.insert(stockMovements).values({ inventoryItemId: c.req.param('id'), ...body, recordedById: userId }).returning();
  const qtyChange = body.type === 'in' || body.type === 'return' ? body.quantity : -body.quantity;
  await db.update(inventoryItems).set({ quantity: sql`quantity + ${qtyChange}`, updatedAt: new Date().toISOString() }).where(eq(inventoryItems.id, c.req.param('id')));
  return c.json({ success: true, data: movement }, 201);
});

inventoryRouter.get('/assets', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(assetTracking).orderBy(desc(assetTracking.createdAt));
  return c.json({ success: true, data: items });
});

inventoryRouter.post('/assets', authMiddleware, requirePermission('inventory', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [asset] = await db.insert(assetTracking).values(body).returning();
  return c.json({ success: true, data: asset }, 201);
});

inventoryRouter.patch('/assets/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  await db.update(assetTracking).set({ ...body, updatedAt: new Date().toISOString() }).where(eq(assetTracking.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Asset updated' } });
});
