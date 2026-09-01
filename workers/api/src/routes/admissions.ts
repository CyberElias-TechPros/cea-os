import { Hono } from 'hono';
import { getDb, applications, applicationDocuments, offers, programs } from '@cea/db';
import { eq, and, desc } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware, requirePermission } from '../middleware/auth';

export const admissionsRouter = new Hono<Env>();

const isStaff = (roles: string[]) => roles.some((r) => r === 'admin' || r === 'staff');

/** Staff-level gate for reading/deciding on the full applicant pool. */
admissionsRouter.get('/', authMiddleware, requirePermission('admissions', 'read'), async (c) => {
  const db = getDb(c.env.DB);
  const { status } = c.req.query();
  const conditions: unknown[] = [sql`deleted_at IS NULL`];
  if (status) conditions.push(eq(applications.status, status as never));
  const items = await db.select().from(applications).where(and(...(conditions as never[]))).orderBy(desc(applications.createdAt));
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
  const userId = c.get('userId');
  const roles = c.get('userRoles');
  const [app] = await db.select().from(applications).where(eq(applications.id, c.req.param('id'))).limit(1);
  if (!app) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Application not found' } }, 404);

  const staff = isStaff(roles);
  const ownsApp = app.userId === userId;
  if (!staff && !ownsApp) {
    return c.json({ success: false, error: { code: 'FORBIDDEN', message: 'Not authorized' } }, 403);
  }

  const docs = await db.select().from(applicationDocuments).where(eq(applicationDocuments.applicationId, app.id));
  const off = await db.select().from(offers).where(eq(offers.applicationId, app.id));
  return c.json({ success: true, data: { ...app, documents: docs, offers: off } });
});

admissionsRouter.post('/', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();

  // `programId` may be a program slug/code (from the public apply page).
  // Resolve it to the real program id so the FK holds; drop it if unresolved.
  if (body.programId) {
    const [program] = await db
      .select({ id: programs.id })
      .from(programs)
      .where(sql`${programs.id} = ${body.programId} OR ${programs.code} = ${body.programId}`)
      .limit(1);
    if (program) body.programId = program.id;
    else delete body.programId;
  }

  const [app] = await db.insert(applications).values({ ...body, userId }).returning();
  return c.json({ success: true, data: app }, 201);
});

admissionsRouter.patch('/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const roles = c.get('userRoles');
  const body = await c.req.json();

  const [app] = await db.select().from(applications).where(eq(applications.id, c.req.param('id'))).limit(1);
  if (!app) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Application not found' } }, 404);

  const staff = isStaff(roles);
  const ownsApp = app.userId === userId;
  if (!staff && !ownsApp) {
    return c.json({ success: false, error: { code: 'FORBIDDEN', message: 'Not authorized' } }, 403);
  }

  // Applicants can only edit their own editable fields while it is still a draft.
  let updates: Record<string, unknown> = { ...body, updatedAt: new Date().toISOString() };
  if (!staff) {
    const allowed = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'address', 'educationLevel', 'previousSchool', 'programId', 'motivation'];
    updates = { updatedAt: new Date().toISOString() };
    for (const key of allowed) {
      if (body[key] !== undefined) updates[key] = body[key];
    }
    if (app.status !== 'draft') {
      return c.json({ success: false, error: { code: 'FORBIDDEN', message: 'Application is no longer editable' } }, 403);
    }
  }

  // Resolve a program slug/code to the real program id.
  if (updates.programId) {
    const [program] = await db
      .select({ id: programs.id })
      .from(programs)
      .where(sql`${programs.id} = ${String(updates.programId)} OR ${programs.code} = ${String(updates.programId)}`)
      .limit(1);
    if (program) updates.programId = program.id;
    else delete updates.programId;
  }

  await db.update(applications).set(updates).where(eq(applications.id, app.id));
  return c.json({ success: true, data: { message: 'Application updated' } });
});

admissionsRouter.post('/:id/submit', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const [app] = await db.select().from(applications).where(eq(applications.id, c.req.param('id'))).limit(1);
  if (!app) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Application not found' } }, 404);
  if (app.userId !== userId) {
    return c.json({ success: false, error: { code: 'FORBIDDEN', message: 'Not authorized' } }, 403);
  }
  await db.update(applications).set({ status: 'submitted', submittedAt: new Date().toISOString(), updatedAt: new Date().toISOString() }).where(eq(applications.id, app.id));
  return c.json({ success: true, data: { message: 'Application submitted' } });
});

admissionsRouter.post('/:id/documents', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const [app] = await db.select().from(applications).where(eq(applications.id, c.req.param('id'))).limit(1);
  if (!app) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Application not found' } }, 404);
  if (app.userId !== userId) {
    return c.json({ success: false, error: { code: 'FORBIDDEN', message: 'Not authorized' } }, 403);
  }
  const body = await c.req.json();
  const [doc] = await db.insert(applicationDocuments).values({ applicationId: app.id, ...body }).returning();
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
  const userId = c.get('userId');
  const { accept } = await c.req.json();
  const [offer] = await db.select().from(offers).where(eq(offers.id, c.req.param('id'))).limit(1);
  if (!offer) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Offer not found' } }, 404);

  const [app] = await db.select().from(applications).where(eq(applications.id, offer.applicationId)).limit(1);
  if (!app || app.userId !== userId) {
    return c.json({ success: false, error: { code: 'FORBIDDEN', message: 'Not authorized' } }, 403);
  }

  const offerStatus = accept ? 'accepted' : 'declined';
  const appStatus = accept ? 'accepted' : 'rejected';
  await db.update(offers).set({ status: offerStatus, respondedAt: new Date().toISOString() }).where(eq(offers.id, offer.id));
  await db.update(applications).set({ status: appStatus, decisionAt: new Date().toISOString(), updatedAt: new Date().toISOString() }).where(eq(applications.id, offer.applicationId));
  return c.json({ success: true, data: { message: `Offer ${offerStatus}` } });
});
