import { Hono } from 'hono';
import { getDb, contracts } from '@cea/db';
import { eq, and, desc } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware, requirePermission } from '../middleware/auth';

export const contractsRouter = new Hono<Env>();

contractsRouter.get('/', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(contracts).where(sql`deleted_at IS NULL`).orderBy(desc(contracts.createdAt));
  return c.json({ success: true, data: items });
});

contractsRouter.get('/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const [contract] = await db.select().from(contracts).where(eq(contracts.id, c.req.param('id'))).limit(1);
  if (!contract) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Contract not found' } }, 404);
  return c.json({ success: true, data: contract });
});

contractsRouter.post('/', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();
  const contractNumber = 'CNT-' + Date.now().toString(36).toUpperCase();
  const [contract] = await db.insert(contracts).values({ ...body, contractNumber, createdById: userId }).returning();
  return c.json({ success: true, data: contract }, 201);
});

contractsRouter.patch('/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  await db.update(contracts).set({ ...body, updatedAt: new Date().toISOString() }).where(eq(contracts.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Contract updated' } });
});

contractsRouter.post('/:id/sign', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const current = await db.select().from(contracts).where(eq(contracts.id, c.req.param('id'))).limit(1);
  if (!current[0]) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Contract not found' } }, 404);
  await db.update(contracts).set({ signedByUs: true, status: 'pending_signature' }).where(eq(contracts.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Contract signed' } });
});
