import { Hono } from 'hono';
import { getDb, portfolios, portfolioProjects } from '@cea/db';
import { eq, asc } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware, requirePermission } from '../middleware/auth';

export const portfolioRouter = new Hono<Env>();

portfolioRouter.get('/public/:userId', async (c) => {
  const db = getDb(c.env.DB);
  const [portfolio] = await db.select().from(portfolios).where(
    eq(portfolios.userId, c.req.param('userId'))
  ).limit(1);
  if (!portfolio || !portfolio.isPublic) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Portfolio not found' } }, 404);

  const projects = await db.select().from(portfolioProjects)
    .where(eq(portfolioProjects.portfolioId, portfolio.id))
    .orderBy(asc(portfolioProjects.orderIndex));

  return c.json({ success: true, data: { ...portfolio, projects } });
});

portfolioRouter.get('/my', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const [portfolio] = await db.select().from(portfolios).where(eq(portfolios.userId, userId)).limit(1);
  if (!portfolio) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Create your portfolio first' } }, 404);

  const projects = await db.select().from(portfolioProjects)
    .where(eq(portfolioProjects.portfolioId, portfolio.id))
    .orderBy(asc(portfolioProjects.orderIndex));

  return c.json({ success: true, data: { ...portfolio, projects } });
});

portfolioRouter.post('/', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();

  const existing = await db.select().from(portfolios).where(eq(portfolios.userId, userId)).limit(1);
  if (existing.length > 0) {
    await db.update(portfolios).set(body).where(eq(portfolios.userId, userId));
    return c.json({ success: true, data: { message: 'Portfolio updated' } });
  }

  const [portfolio] = await db.insert(portfolios).values({ userId, ...body }).returning();
  return c.json({ success: true, data: portfolio }, 201);
});

portfolioRouter.patch('/my', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();
  await db.update(portfolios).set(body).where(eq(portfolios.userId, userId));
  return c.json({ success: true, data: { message: 'Portfolio updated' } });
});

portfolioRouter.post('/projects', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();

  const [portfolio] = await db.select().from(portfolios).where(eq(portfolios.userId, userId)).limit(1);
  if (!portfolio) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Create portfolio first' } }, 404);

  const [project] = await db.insert(portfolioProjects).values({ portfolioId: portfolio.id, ...body }).returning();
  return c.json({ success: true, data: project }, 201);
});

portfolioRouter.patch('/projects/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  await db.update(portfolioProjects).set(body).where(eq(portfolioProjects.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Project updated' } });
});

portfolioRouter.delete('/projects/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  await db.delete(portfolioProjects).where(eq(portfolioProjects.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Project deleted' } });
});
