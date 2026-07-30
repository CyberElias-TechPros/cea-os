import { Hono } from 'hono';
import { getDb, contacts, deals } from '@cea/db';
import { eq, and, desc, asc, count } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware, requirePermission } from '../middleware/auth';

export const crmRouter = new Hono<Env>();

crmRouter.get('/contacts', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const { search, status, type } = c.req.query();
  const conditions = [sql`deleted_at IS NULL`];
  if (status) conditions.push(eq(contacts.status, status as any));
  if (type) conditions.push(eq(contacts.type, type as any));
  if (search) conditions.push(sql`(first_name || ' ' || last_name LIKE ${'%' + search + '%'} OR email LIKE ${'%' + search + '%'} OR company LIKE ${'%' + search + '%'})`);
  const items = await db.select().from(contacts).where(and(...conditions)).orderBy(desc(contacts.createdAt));
  return c.json({ success: true, data: items });
});

crmRouter.get('/contacts/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const [contact] = await db.select().from(contacts).where(eq(contacts.id, c.req.param('id'))).limit(1);
  if (!contact) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Contact not found' } }, 404);
  return c.json({ success: true, data: contact });
});

crmRouter.post('/contacts', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [contact] = await db.insert(contacts).values(body).returning();
  return c.json({ success: true, data: contact }, 201);
});

crmRouter.patch('/contacts/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  await db.update(contacts).set({ ...body, updatedAt: new Date().toISOString() }).where(eq(contacts.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Contact updated' } });
});

crmRouter.delete('/contacts/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  await db.update(contacts).set({ deletedAt: new Date().toISOString() }).where(eq(contacts.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Contact deleted' } });
});

crmRouter.get('/deals', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(deals).where(sql`deleted_at IS NULL`).orderBy(desc(deals.createdAt));
  return c.json({ success: true, data: items });
});

crmRouter.get('/deals/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const [deal] = await db.select().from(deals).where(eq(deals.id, c.req.param('id'))).limit(1);
  if (!deal) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Deal not found' } }, 404);
  return c.json({ success: true, data: deal });
});

crmRouter.post('/deals', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [deal] = await db.insert(deals).values(body).returning();
  return c.json({ success: true, data: deal }, 201);
});

crmRouter.patch('/deals/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  await db.update(deals).set({ ...body, updatedAt: new Date().toISOString() }).where(eq(deals.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Deal updated' } });
});

crmRouter.delete('/deals/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  await db.update(deals).set({ deletedAt: new Date().toISOString() }).where(eq(deals.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Deal deleted' } });
});

crmRouter.get('/pipeline', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const pipeline = await db.select({
    stage: deals.stage,
    count: count(),
    value: sql`SUM(${deals.value})`,
  }).from(deals).where(and(sql`deleted_at IS NULL`, sql`stage NOT IN ('closed_won', 'closed_lost')`)).groupBy(deals.stage);
  return c.json({ success: true, data: pipeline });
});
