import { Hono } from 'hono';
import { getDb, employers, jobListings, jobApplications, jobInterviews, freelanceGigs, gigApplications } from '@cea/db';
import { eq, and, asc, desc, count, sql } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware, requirePermission } from '../middleware/auth';

export const marketplaceRouter = new Hono<Env>();

// --- Employer Profile ---
marketplaceRouter.post('/employers', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();

  const existing = await db.select().from(employers).where(eq(employers.userId, userId)).limit(1);
  if (existing.length > 0) return c.json({ success: false, error: { code: 'CONFLICT', message: 'Employer profile exists' } }, 409);

  const [employer] = await db.insert(employers).values({ userId, ...body }).returning();
  return c.json({ success: true, data: employer }, 201);
});

marketplaceRouter.get('/employers/me', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const [employer] = await db.select().from(employers).where(eq(employers.userId, userId)).limit(1);
  if (!employer) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Employer profile not found' } }, 404);
  return c.json({ success: true, data: employer });
});

// --- Job Listings ---
marketplaceRouter.post('/jobs', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const [employer] = await db.select().from(employers).where(eq(employers.userId, userId)).limit(1);
  if (!employer) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Create employer profile first' } }, 404);

  const body = await c.req.json();
  const slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString(36);

  const [job] = await db.insert(jobListings).values({
    employerId: employer.id, slug, ...body,
    createdById: userId,
    postedAt: body.status === 'published' ? new Date() : null,
  }).returning();

  return c.json({ success: true, data: job }, 201);
});

marketplaceRouter.get('/jobs', async (c) => {
  const db = getDb(c.env.DB);
  const { search, location, type, remote } = c.req.query();
  const all = await db.select().from(jobListings)
    .where(eq(jobListings.status, 'published'))
    .orderBy(desc(jobListings.postedAt));
  return c.json({ success: true, data: all });
});

marketplaceRouter.get('/jobs/:id', async (c) => {
  const db = getDb(c.env.DB);
  const [job] = await db.select().from(jobListings).where(eq(jobListings.id, c.req.param('id'))).limit(1);
  if (!job) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Job not found' } }, 404);

  const [employer] = await db.select().from(employers).where(eq(employers.id, job.employerId)).limit(1);
  return c.json({ success: true, data: { ...job, employer } });
});

marketplaceRouter.get('/jobs/my', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const [employer] = await db.select().from(employers).where(eq(employers.userId, userId)).limit(1);
  if (!employer) return c.json({ success: true, data: [] });

  const jobs = await db.select().from(jobListings).where(eq(jobListings.employerId, employer.id)).orderBy(desc(jobListings.createdAt));
  return c.json({ success: true, data: jobs });
});

marketplaceRouter.patch('/jobs/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  await db.update(jobListings).set(body).where(eq(jobListings.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Job updated' } });
});

// --- Job Applications ---
marketplaceRouter.post('/jobs/:id/apply', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const jobId = c.req.param('id');
  const userId = c.get('userId');
  const body = await c.req.json();

  const existing = await db.select().from(jobApplications)
    .where(and(eq(jobApplications.jobListingId, jobId), eq(jobApplications.userId, userId)))
    .limit(1);
  if (existing.length > 0) return c.json({ success: false, error: { code: 'CONFLICT', message: 'Already applied' } }, 409);

  const [app] = await db.insert(jobApplications).values({ jobListingId: jobId, userId, ...body }).returning();
  await db.update(jobListings).set({ applicationsCount: sql`applications_count + 1` }).where(eq(jobListings.id, jobId));
  return c.json({ success: true, data: app }, 201);
});

marketplaceRouter.get('/applications/my', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const apps = await db.select().from(jobApplications).where(eq(jobApplications.userId, userId)).orderBy(desc(jobApplications.appliedAt));
  return c.json({ success: true, data: apps });
});

marketplaceRouter.get('/jobs/:id/applications', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const apps = await db.select().from(jobApplications).where(eq(jobApplications.jobListingId, c.req.param('id'))).orderBy(desc(jobApplications.appliedAt));
  return c.json({ success: true, data: apps });
});

marketplaceRouter.patch('/applications/:id/status', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const { status, notes } = await c.req.json();
  await db.update(jobApplications).set({ status, notes }).where(eq(jobApplications.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Application updated' } });
});

// --- Interviews ---
marketplaceRouter.post('/interviews', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [interview] = await db.insert(jobInterviews).values(body).returning();
  return c.json({ success: true, data: interview }, 201);
});

marketplaceRouter.get('/interviews/:applicationId', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const interviews = await db.select().from(jobInterviews).where(eq(jobInterviews.applicationId, c.req.param('applicationId')));
  return c.json({ success: true, data: interviews });
});

// --- Freelance Gigs ---
marketplaceRouter.post('/gigs', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const [employer] = await db.select().from(employers).where(eq(employers.userId, userId)).limit(1);
  if (!employer) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Create employer profile first' } }, 404);

  const body = await c.req.json();
  const [gig] = await db.insert(freelanceGigs).values({ employerId: employer.id, ...body }).returning();
  return c.json({ success: true, data: gig }, 201);
});

marketplaceRouter.get('/gigs', async (c) => {
  const db = getDb(c.env.DB);
  const gigs = await db.select().from(freelanceGigs).where(eq(freelanceGigs.status, 'open')).orderBy(desc(freelanceGigs.createdAt));
  return c.json({ success: true, data: gigs });
});

marketplaceRouter.post('/gigs/:id/apply', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();
  const [app] = await db.insert(gigApplications).values({ gigId: c.req.param('id'), userId, ...body }).returning();
  return c.json({ success: true, data: app }, 201);
});
