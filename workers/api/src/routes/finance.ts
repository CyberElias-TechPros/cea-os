import { Hono } from 'hono';
import { getDb, chartOfAccounts, transactions, expenseClaims, budgets } from '@cea/db';
import { eq, and, desc, asc, count } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware, requirePermission } from '../middleware/auth';

export const financeRouter = new Hono<Env>();

financeRouter.get('/accounts', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(chartOfAccounts).orderBy(asc(chartOfAccounts.code));
  return c.json({ success: true, data: items });
});

financeRouter.post('/accounts', authMiddleware, requirePermission('finance', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [item] = await db.insert(chartOfAccounts).values(body).returning();
  return c.json({ success: true, data: item }, 201);
});

financeRouter.get('/transactions', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const { accountId, type, category } = c.req.query();
  const conditions: any[] = [];
  if (accountId) conditions.push(eq(transactions.accountId, accountId));
  if (type) conditions.push(eq(transactions.type, type as any));
  if (category) conditions.push(eq(transactions.category, category as any));
  const items = await db.select().from(transactions).where(and(...conditions)).orderBy(desc(transactions.transactionDate));
  return c.json({ success: true, data: items });
});

financeRouter.post('/transactions', authMiddleware, requirePermission('finance', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();
  const [tx] = await db.insert(transactions).values({ ...body, recordedById: userId }).returning();
  return c.json({ success: true, data: tx }, 201);
});

financeRouter.get('/expenses', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const { status } = c.req.query();
  const conditions: any[] = [eq(expenseClaims.userId, userId)];
  if (status) conditions.push(eq(expenseClaims.status, status as any));
  const items = await db.select().from(expenseClaims).where(and(...conditions)).orderBy(desc(expenseClaims.createdAt));
  return c.json({ success: true, data: items });
});

financeRouter.post('/expenses', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();
  const [claim] = await db.insert(expenseClaims).values({ ...body, userId }).returning();
  return c.json({ success: true, data: claim }, 201);
});

financeRouter.post('/expenses/:id/approve', authMiddleware, requirePermission('finance', 'update'), async (c) => {
  const db = getDb(c.env.DB);
  const { approved } = await c.req.json();
  const status = approved ? 'approved' : 'rejected';
  await db.update(expenseClaims).set({ status, approvedById: c.get('userId'), approvedAt: new Date().toISOString(), updatedAt: new Date().toISOString() }).where(eq(expenseClaims.id, c.req.param('id')));
  return c.json({ success: true, data: { message: `Expense ${status}` } });
});

financeRouter.get('/budgets', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(budgets).orderBy(desc(budgets.createdAt));
  return c.json({ success: true, data: items });
});

financeRouter.post('/budgets', authMiddleware, requirePermission('finance', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [budget] = await db.insert(budgets).values(body).returning();
  return c.json({ success: true, data: budget }, 201);
});
