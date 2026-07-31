import { Hono } from 'hono';
import { getDb, employers, jobListings, jobApplications, jobInterviews, jobOffers, freelanceGigs, gigApplications, users } from '@cea/db';
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

marketplaceRouter.get('/employers/directory', async (c) => {
  const db = getDb(c.env.DB);
  const rows = await db.select().from(employers).where(eq(employers.status, 'active')).orderBy(asc(employers.companyName));
  const data = await Promise.all(rows.map(async (emp) => {
    const jobs = await db.select({ id: jobListings.id, title: jobListings.title, location: jobListings.location, employmentType: jobListings.employmentType, salaryMin: jobListings.salaryMin, salaryMax: jobListings.salaryMax, salaryCurrency: jobListings.salaryCurrency })
      .from(jobListings)
      .where(and(eq(jobListings.employerId, emp.id), eq(jobListings.status, 'published')))
      .orderBy(desc(jobListings.postedAt))
      .limit(5);
    return { employer: emp, jobs };
  }));
  return c.json({ success: true, data });
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

// --- Pipeline (staff kanban) ---
marketplaceRouter.get('/applications/pipeline', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const rows = await db
    .select({
      id: jobApplications.id,
      jobListingId: jobApplications.jobListingId,
      userId: jobApplications.userId,
      coverLetter: jobApplications.coverLetter,
      matchScore: jobApplications.matchScore,
      status: jobApplications.status,
      notes: jobApplications.notes,
      appliedAt: jobApplications.appliedAt,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      jobTitle: jobListings.title,
      jobSlug: jobListings.slug,
    })
    .from(jobApplications)
    .innerJoin(users, eq(jobApplications.userId, users.id))
    .innerJoin(jobListings, eq(jobApplications.jobListingId, jobListings.id))
    .orderBy(desc(jobApplications.appliedAt));
  const interviews = await db.select().from(jobInterviews).orderBy(desc(jobInterviews.scheduledAt));
  const offers = await db.select().from(jobOffers).orderBy(desc(jobOffers.createdAt));
  return c.json({ success: true, data: rows.map((app) => ({ ...app, interviews: interviews.filter((i) => i.applicationId === app.id), offers: offers.filter((o) => o.applicationId === app.id) })) });
});

// --- Interviews ---
marketplaceRouter.post('/interviews', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [interview] = await db.insert(jobInterviews).values(body).returning();
  if (body.schedule) await db.update(jobApplications).set({ status: 'interviewed' }).where(eq(jobApplications.id, body.applicationId));
  return c.json({ success: true, data: interview }, 201);
});

marketplaceRouter.get('/interviews/:applicationId', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const interviews = await db.select().from(jobInterviews).where(eq(jobInterviews.applicationId, c.req.param('applicationId')));
  return c.json({ success: true, data: interviews });
});

marketplaceRouter.patch('/interviews/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  await db.update(jobInterviews).set({ ...body, updatedAt: new Date() }).where(eq(jobInterviews.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Interview updated' } });
});

// --- Offers ---
marketplaceRouter.post('/applications/:id/offer', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const { salary, salaryCurrency, employmentType, startDate, notes } = await c.req.json();
  const existing = await db.select().from(jobOffers).where(eq(jobOffers.applicationId, c.req.param('id'))).limit(1);
  if (existing.length > 0) return c.json({ success: false, error: { code: 'CONFLICT', message: 'Offer already exists for this application' } }, 409);
  const [offer] = await db.insert(jobOffers).values({ applicationId: c.req.param('id'), salary, salaryCurrency, employmentType, startDate, notes, offeredById: c.get('userId') }).returning();
  await db.update(jobApplications).set({ status: 'offered' }).where(eq(jobApplications.id, c.req.param('id')));
  return c.json({ success: true, data: offer }, 201);
});

marketplaceRouter.get('/offers/my', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const rows = await db
    .select({
      id: jobOffers.id,
      salary: jobOffers.salary,
      salaryCurrency: jobOffers.salaryCurrency,
      employmentType: jobOffers.employmentType,
      startDate: jobOffers.startDate,
      notes: jobOffers.notes,
      status: jobOffers.status,
      respondedAt: jobOffers.respondedAt,
      createdAt: jobOffers.createdAt,
      jobTitle: jobListings.title,
      companyName: employers.companyName,
      appStatus: jobApplications.status,
    })
    .from(jobOffers)
    .innerJoin(jobApplications, eq(jobOffers.applicationId, jobApplications.id))
    .innerJoin(jobListings, eq(jobApplications.jobListingId, jobListings.id))
    .innerJoin(employers, eq(jobListings.employerId, employers.id))
    .where(eq(jobApplications.userId, userId))
    .orderBy(desc(jobOffers.createdAt));
  return c.json({ success: true, data: rows });
});

marketplaceRouter.post('/offers/:id/respond', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const { accept } = await c.req.json();
  const [offer] = await db.select().from(jobOffers).where(eq(jobOffers.id, c.req.param('id'))).limit(1);
  if (!offer) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Offer not found' } }, 404);
  const status = accept ? 'accepted' : 'declined';
  await db.update(jobOffers).set({ status, respondedAt: new Date() }).where(eq(jobOffers.id, offer.id));
  await db.update(jobApplications).set({ status: accept ? 'hired' : 'withdrawn' }).where(eq(jobApplications.id, offer.applicationId));
  return c.json({ success: true, data: { message: `Offer ${status}` } });
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
