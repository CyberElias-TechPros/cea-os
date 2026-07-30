import { Hono } from 'hono';
import { getDb, applications, applicationDocuments, offers } from '@cea/db';
import { eq, and, desc, asc } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware, requirePermission } from '../middleware/auth';

export const admissionsRouter = new Hono<Env>();

admissionsRouter.get('/', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const { status } = c.req.query();
  const conditions: any[] = [sql`deleted_at IS NULL`];
  if (status) conditions.push(eq(applications.status, status as any));
  const items = await db.select().from(applications).where(and(...conditions)).orderBy(desc(applications.createdAt));
  return c.json({ success: true, data: items });
});

admissionsRouter.get('/my', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const items = await db.select().from(applications).where(eq(applications.userId, userId)).orderBy(desc(applications.createdAt));
  return c.json({ success: true, data: items });
});

admissionsRouter.get('/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const [app] = await db.select().from(applications).where(eq(applications.id, c.req.param('id'))).limit(1);
  if (!app) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Application not found' } }, 404);
  const docs = await db.select().from(applicationDocuments).where(eq(applicationDocuments.applicationId, app.id));
  const off = await db.select().from(offers).where(eq(offers.applicationId, app.id));
  return c.json({ success: true, data: { ...app, documents: docs, offers: off } });
});

admissionsRouter.post('/', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();
  const [app] = await db.insert(applications).values({ ...body, userId }).returning();
  return c.json({ success: true, data: app }, 201);
});

admissionsRouter.patch('/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  await db.update(applications).set({ ...body, updatedAt: new Date().toISOString() }).where(eq(applications.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Application updated' } });
});

admissionsRouter.post('/:id/submit', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  await db.update(applications).set({ status: 'submitted', submittedAt: new Date().toISOString(), updatedAt: new Date().toISOString() }).where(eq(applications.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Application submitted' } });
});

admissionsRouter.post('/:id/documents', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [doc] = await db.insert(applicationDocuments).values({ applicationId: c.req.param('id'), ...body }).returning();
  return c.json({ success: true, data: doc }, 201);
});

admissionsRouter.post('/:id/offers', authMiddleware, requirePermission('admissions', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [offer] = await db.insert(offers).values({ applicationId: c.req.param('id'), ...body }).returning();
  await db.update(applications).set({ status: 'offer_made', updatedAt: new Date().toISOString() }).where(eq(applications.id, c.req.param('id')));
  return c.json({ success: true, data: offer }, 201);
});

admissionsRouter.post('/offers/:id/respond', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const { accept } = await c.req.json();
  const [offer] = await db.select().from(offers).where(eq(offers.id, c.req.param('id'))).limit(1);
  if (!offer) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Offer not found' } }, 404);
  const offerStatus = accept ? 'accepted' : 'declined';
  const appStatus = accept ? 'accepted' : 'rejected';
  await db.update(offers).set({ status: offerStatus, respondedAt: new Date().toISOString() }).where(eq(offers.id, c.req.param('id')));
  await db.update(applications).set({ status: appStatus, decisionAt: new Date().toISOString(), updatedAt: new Date().toISOString() }).where(eq(applications.id, offer.applicationId));
  return c.json({ success: true, data: { message: `Offer ${offerStatus}` } });
});
