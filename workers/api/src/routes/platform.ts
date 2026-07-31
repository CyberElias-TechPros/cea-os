import { Hono } from 'hono';
import { getDb, users, enrollments, grades, attendanceRecords, transactions, supportTickets, jobApplications, applications, invoices, contacts, okrs, campaigns, contentCalendar, knowledgeBaseArticles, webhooks, newsletterSubscribers, wardLinks, internTasks, internTimesheets, volunteerHours, volunteerSignups, volunteerOpportunities, donations, scholarshipApplications, partnerships, suppliers, purchaseOrders, employees } from '@cea/db';
import { eq, and, desc, asc, count, gte, avg, lt, sql } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware, requirePermission } from '../middleware/auth';
import { AnalyticsEngine } from '../services/analytics';

export const platformRouter = new Hono<Env>();

// ============ EXECUTIVE ============
platformRouter.get('/executive/kpis', authMiddleware, requirePermission('analytics', 'read'), async (c) => {
  const db = getDb(c.env.DB);
  const engine = new AnalyticsEngine(db);
  const summary = await engine.getSummary();

  const revRows = await db.select({ sum: sql`SUM(amount)` }).from(transactions).where(eq(transactions.type, 'credit'));
  const expRows = await db.select({ sum: sql`SUM(amount)` }).from(transactions).where(eq(transactions.type, 'debit'));
  const ticketRows = await db.select({ count: count() }).from(supportTickets);
  const openTickets = await db.select({ count: count() }).from(supportTickets).where(eq(supportTickets.status, 'open'));
  const appRows = await db.select({ count: count() }).from(applications).where(eq(applications.status, 'submitted'));
  const payrollRows = await db.select({ count: count() }).from(employees);
  const staffActive = await db.select({ count: count() }).from(employees).where(eq(employees.status, 'active'));
  const invoicesPaid = await db.select({ sum: sql`SUM(total)` }).from(invoices).where(eq(invoices.status, 'paid'));

  const revenue = Number(revRows[0]?.sum ?? 0);
  const expenses = Number(expRows[0]?.sum ?? 0);
  const atRisk = await engine.getAtRiskStudents(5);

  return c.json({
    success: true,
    data: {
      students: summary.totalStudents,
      activeEnrollments: summary.activeEnrollments,
      avgGrade: summary.avgGrade,
      passRate: summary.passRate,
      attendanceRate: summary.attendanceRate,
      courseCompletions: summary.courseCompletions,
      newEnrollmentsThisMonth: summary.newEnrollmentsThisMonth,
      revenue,
      expenses,
      netIncome: revenue - expenses,
      invoicedAndPaid: Number(invoicesPaid[0]?.sum ?? 0),
      openTickets: Number(openTickets[0]?.count ?? 0),
      totalTickets: Number(ticketRows[0]?.count ?? 0),
      pendingApplications: Number(appRows[0]?.count ?? 0),
      staffTotal: Number(payrollRows[0]?.count ?? 0),
      staffActive: Number(staffActive[0]?.count ?? 0),
      atRisk,
    },
  });
});

// ============ OKRs ============
platformRouter.get('/okrs', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(okrs).orderBy(desc(okrs.updatedAt));
  return c.json({ success: true, data: items });
});

platformRouter.post('/okrs', authMiddleware, requirePermission('hr', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [okr] = await db.insert(okrs).values({ ...body, ownerId: body.ownerId ?? c.get('userId') }).returning();
  return c.json({ success: true, data: okr }, 201);
});

platformRouter.patch('/okrs/:id', authMiddleware, requirePermission('hr', 'update'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  await db.update(okrs).set({ ...body, updatedAt: new Date().toISOString() }).where(eq(okrs.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'OKR updated' } });
});

platformRouter.delete('/okrs/:id', authMiddleware, requirePermission('hr', 'update'), async (c) => {
  const db = getDb(c.env.DB);
  await db.delete(okrs).where(eq(okrs.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'OKR deleted' } });
});

// ============ MARKETING ============
platformRouter.get('/marketing/campaigns', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(campaigns).orderBy(desc(campaigns.createdAt));
  return c.json({ success: true, data: items });
});

platformRouter.post('/marketing/campaigns', authMiddleware, requirePermission('marketing', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [item] = await db.insert(campaigns).values({ ...body, createdById: c.get('userId') }).returning();
  return c.json({ success: true, data: item }, 201);
});

platformRouter.post('/marketing/campaigns/:id/send', authMiddleware, requirePermission('marketing', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  const [campaign] = await db.select().from(campaigns).where(eq(campaigns.id, c.req.param('id'))).limit(1);
  if (!campaign) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Campaign not found' } }, 404);
  const subRows = await db.select({ subCount: count() }).from(newsletterSubscribers).where(eq(newsletterSubscribers.status, 'subscribed'));
  const subCount = Number(subRows[0]?.subCount ?? 0);
  const now = new Date().toISOString();
  await db.update(campaigns).set({ status: 'sent', sentAt: now, sentCount: subCount, updatedAt: now }).where(eq(campaigns.id, campaign.id));
  return c.json({ success: true, data: { message: `Campaign sent to ${subCount} subscribers`, sentCount: subCount } });
});

platformRouter.get('/marketing/content', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(contentCalendar).orderBy(desc(contentCalendar.publishAt ?? contentCalendar.createdAt));
  return c.json({ success: true, data: items });
});

platformRouter.post('/marketing/content', authMiddleware, requirePermission('marketing', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [item] = await db.insert(contentCalendar).values({ ...body, authorId: body.authorId ?? c.get('userId') }).returning();
  return c.json({ success: true, data: item }, 201);
});

platformRouter.patch('/marketing/content/:id', authMiddleware, requirePermission('marketing', 'update'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  await db.update(contentCalendar).set({ ...body, updatedAt: new Date().toISOString() }).where(eq(contentCalendar.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Content item updated' } });
});

platformRouter.get('/marketing/leads', authMiddleware, requirePermission('marketing', 'read'), async (c) => {
  const db = getDb(c.env.DB);
  const subs = await db.select().from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.createdAt));
  return c.json({ success: true, data: subs });
});

// ============ NEWSLETTER (public) ============
platformRouter.post('/newsletter', async (c) => {
  const db = getDb(c.env.DB);
  const { email, firstName, source } = await c.req.json();
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) return c.json({ success: false, error: { code: 'BAD_REQUEST', message: 'Valid email required' } }, 400);
  const existing = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email)).limit(1);
  if (existing.length > 0) return c.json({ success: true, data: { message: 'Already subscribed' } });
  const [sub] = await db.insert(newsletterSubscribers).values({ email, firstName, source: source ?? 'footer' }).returning();
  return c.json({ success: true, data: sub }, 201);
});

// ============ IT SUPPORT ============
platformRouter.get('/it/kb', async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(knowledgeBaseArticles).where(eq(knowledgeBaseArticles.published, true)).orderBy(desc(knowledgeBaseArticles.updatedAt));
  return c.json({ success: true, data: items });
});

platformRouter.get('/it/kb/all', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(knowledgeBaseArticles).orderBy(desc(knowledgeBaseArticles.updatedAt));
  return c.json({ success: true, data: items });
});

platformRouter.post('/it/kb', authMiddleware, requirePermission('admin', 'update'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [item] = await db.insert(knowledgeBaseArticles).values({ ...body, authorId: c.get('userId') }).returning();
  return c.json({ success: true, data: item }, 201);
});

platformRouter.patch('/it/kb/:id', authMiddleware, requirePermission('admin', 'update'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  await db.update(knowledgeBaseArticles).set({ ...body, updatedAt: new Date().toISOString() }).where(eq(knowledgeBaseArticles.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Article updated' } });
});

platformRouter.post('/it/kb/:id/helpful', async (c) => {
  const db = getDb(c.env.DB);
  await db.update(knowledgeBaseArticles).set({ helpfulCount: sql`helpful_count + 1` }).where(eq(knowledgeBaseArticles.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Thanks' } });
});

platformRouter.get('/it/monitoring', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const now = new Date();
  const dayStart = new Date(now);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
  const openTickets = await db.select({ count: count() }).from(supportTickets).where(eq(supportTickets.status, 'open'));
  const allTickets = await db.select({ count: count() }).from(supportTickets);
  const kbCount = await db.select({ count: count() }).from(knowledgeBaseArticles);
  const todayVisitors = await db.select({ count: count() }).from(attendanceRecords).where(and(gte(attendanceRecords.sessionDate, dayStart), lt(attendanceRecords.sessionDate, dayEnd)));
  return c.json({
    success: true,
    data: {
      checkedAt: now,
      api: 'healthy',
      openTickets: Number(openTickets[0]?.count ?? 0),
      totalTickets: Number(allTickets[0]?.count ?? 0),
      kbArticles: Number(kbCount[0]?.count ?? 0),
      todayAttendance: Number(todayVisitors[0]?.count ?? 0),
    },
  });
});

// ============ WEBHOOKS ============
platformRouter.get('/webhooks', authMiddleware, requirePermission('admin', 'update'), async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(webhooks).orderBy(desc(webhooks.createdAt));
  return c.json({ success: true, data: items });
});

platformRouter.post('/webhooks', authMiddleware, requirePermission('admin', 'update'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [hook] = await db.insert(webhooks).values({ ...body, events: body.events ?? [] }).returning();
  return c.json({ success: true, data: hook }, 201);
});

platformRouter.patch('/webhooks/:id', authMiddleware, requirePermission('admin', 'update'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  await db.update(webhooks).set(body).where(eq(webhooks.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Webhook updated' } });
});

platformRouter.delete('/webhooks/:id', authMiddleware, requirePermission('admin', 'update'), async (c) => {
  const db = getDb(c.env.DB);
  await db.delete(webhooks).where(eq(webhooks.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Webhook deleted' } });
});

platformRouter.post('/webhooks/:id/test', authMiddleware, requirePermission('admin', 'update'), async (c) => {
  const [hook] = await getDb(c.env.DB).select().from(webhooks).where(eq(webhooks.id, c.req.param('id'))).limit(1);
  if (!hook) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Webhook not found' } }, 404);
  let delivered = false;
  try {
    const res = await fetch(hook.url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-cea-event': 'webhook.test', 'x-cea-signature': hook.secret ?? 'test' },
      body: JSON.stringify({ event: 'webhook.test', timestamp: Date.now(), data: { ok: true } }),
    });
    delivered = res.ok;
  } catch {
    delivered = false;
  }
  if (delivered) await getDb(c.env.DB).update(webhooks).set({ lastDeliveredAt: new Date().toISOString() }).where(eq(webhooks.id, hook.id));
  return c.json({ success: true, data: { delivered } });
});

// ============ EXTERNAL PORTALS ============
const userEmail = async (db: ReturnType<typeof getDb>, userId: string) => {
  const [u] = await db.select({ email: users.email }).from(users).where(eq(users.id, userId)).limit(1);
  return u?.email?.toLowerCase() ?? null;
};

// Supplier
platformRouter.get('/portals/supplier', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const email = await userEmail(db, c.get('userId'));
  if (!email) return c.json({ success: true, data: { supplier: null, orders: [] } });
  const [supplier] = await db.select().from(suppliers).where(eq(suppliers.email, email)).limit(1);
  if (!supplier) return c.json({ success: true, data: { supplier: null, orders: [] } });
  const orders = await db
    .select({ id: purchaseOrders.id, poNumber: purchaseOrders.poNumber, status: purchaseOrders.status, totalAmount: purchaseOrders.totalAmount, currency: purchaseOrders.currency, expectedDate: purchaseOrders.expectedDate, notes: purchaseOrders.notes, createdAt: purchaseOrders.createdAt })
    .from(purchaseOrders)
    .where(eq(purchaseOrders.supplierId, supplier.id))
    .orderBy(desc(purchaseOrders.createdAt));
  return c.json({ success: true, data: { supplier, orders } });
});

platformRouter.post('/portals/supplier/orders/:id/respond', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const { accepted } = await c.req.json();
  const [order] = await db.select().from(purchaseOrders).where(eq(purchaseOrders.id, c.req.param('id'))).limit(1);
  if (!order) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Order not found' } }, 404);
  const status = accepted ? 'approved' : 'cancelled';
  await db.update(purchaseOrders).set({ status }).where(eq(purchaseOrders.id, order.id));
  return c.json({ success: true, data: { message: `Order ${status}` } });
});

// Partner
platformRouter.get('/portals/partner', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const email = await userEmail(db, c.get('userId'));
  if (!email) return c.json({ success: true, data: { partnership: null } });
  const [partnership] = await db.select().from(partnerships).where(sql`LOWER(email) = ${email} AND deleted_at IS NULL`).limit(1);
  if (!partnership) return c.json({ success: true, data: { partnership: null } });
  const referrals = await db.select().from(applications).where(sql`LOWER(applications.email) = ${email}`).orderBy(desc(applications.createdAt));
  return c.json({ success: true, data: { partnership, referrals } });
});

// Parent
platformRouter.get('/portals/parent', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const parentId = c.get('userId');
  const links = await db.select().from(wardLinks).where(eq(wardLinks.parentId, parentId));
  const wards = await Promise.all(links.map(async (link) => {
    const [student] = await db.select().from(users).where(eq(users.id, link.studentUserId)).limit(1);
    const invoiceRows = student
      ? await db
          .select({ id: invoices.id, invoiceNumber: invoices.invoiceNumber, status: invoices.status, total: invoices.total, currency: invoices.currency, dueDate: invoices.dueDate, paidAt: invoices.paidAt, createdAt: invoices.createdAt })
          .from(invoices)
          .innerJoin(contacts, eq(invoices.clientId, contacts.id))
          .where(eq(contacts.email, student.email))
          .orderBy(desc(invoices.createdAt))
      : [];
    const enrRows = await db.select().from(enrollments).where(eq(enrollments.userId, link.studentUserId));
    const studentGrades: number[] = [];
    let absences = 0;
    for (const enr of enrRows) {
      const rows = await db.select({ score: grades.score }).from(grades).where(eq(grades.enrollmentId, enr.id));
      rows.forEach((r) => r.score !== null && studentGrades.push(Number(r.score)));
      const attRows = await db.select({ count: count() }).from(attendanceRecords).where(and(eq(attendanceRecords.enrollmentId, enr.id), eq(attendanceRecords.status, 'absent')));
      absences += Number(attRows[0]?.count ?? 0);
    }
    return {
      studentId: link.studentUserId,
      relation: link.relation,
      student: student ? { firstName: student.firstName, lastName: student.lastName, email: student.email } : null,
      invoices: invoiceRows,
      courses: enrRows.length,
      avgGrade: studentGrades.length ? Math.round(studentGrades.reduce((s, g) => s + g, 0) / studentGrades.length) : null,
      absences,
    };
  }));
  return c.json({ success: true, data: wards });
});

platformRouter.post('/portals/parent/link', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const { studentEmail, relation } = await c.req.json();
  const [student] = await db.select().from(users).where(eq(users.email, studentEmail)).limit(1);
  if (!student) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Student not found' } }, 404);
  const existing = await db.select().from(wardLinks).where(and(eq(wardLinks.parentId, c.get('userId')), eq(wardLinks.studentUserId, student.id))).limit(1);
  if (existing.length > 0) return c.json({ success: false, error: { code: 'CONFLICT', message: 'Already linked' } }, 409);
  const [link] = await db.insert(wardLinks).values({ parentId: c.get('userId'), studentUserId: student.id, relation: relation ?? 'guardian' }).returning();
  return c.json({ success: true, data: link }, 201);
});

// Volunteer
platformRouter.get('/portals/volunteer', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const opportunities = await db.select().from(volunteerOpportunities).where(eq(volunteerOpportunities.status, 'open')).orderBy(desc(volunteerOpportunities.createdAt));
  const signups = await db.select().from(volunteerSignups).where(eq(volunteerSignups.userId, userId)).orderBy(desc(volunteerSignups.createdAt));
  const hours = await db.select().from(volunteerHours).where(eq(volunteerHours.volunteerUserId, userId)).orderBy(desc(volunteerHours.date));
  const totalHours = hours.filter((h) => h.status === 'approved').reduce((s, h) => s + h.hours, 0);
  return c.json({ success: true, data: { opportunities, signups, hours, totalHours } });
});

platformRouter.post('/portals/volunteer/signup', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const { opportunityId } = await c.req.json();
  const [signup] = await db.insert(volunteerSignups).values({ opportunityId, userId: c.get('userId') }).returning();
  return c.json({ success: true, data: signup }, 201);
});

platformRouter.post('/portals/volunteer/hours', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [entry] = await db.insert(volunteerHours).values({ ...body, volunteerUserId: c.get('userId') }).returning();
  return c.json({ success: true, data: entry }, 201);
});

// Intern
platformRouter.get('/portals/intern', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const tasks = await db.select().from(internTasks).where(eq(internTasks.internUserId, userId)).orderBy(desc(internTasks.createdAt));
  const timesheets = await db.select().from(internTimesheets).where(eq(internTimesheets.internUserId, userId)).orderBy(desc(internTimesheets.date));
  const approved = timesheets.filter((t) => t.status === 'approved').reduce((s, t) => s + t.hours, 0);
  const pending = timesheets.filter((t) => t.status === 'pending').reduce((s, t) => s + t.hours, 0);
  return c.json({ success: true, data: { tasks, timesheets, approvedHours: approved, pendingHours: pending } });
});

platformRouter.post('/portals/intern/tasks', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [task] = await db.insert(internTasks).values({ ...body, internUserId: c.get('userId') }).returning();
  return c.json({ success: true, data: task }, 201);
});

platformRouter.patch('/portals/intern/tasks/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  await db.update(internTasks).set({ ...body, updatedAt: new Date().toISOString() }).where(eq(internTasks.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Task updated' } });
});

platformRouter.post('/portals/intern/timesheets', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [ts] = await db.insert(internTimesheets).values({ ...body, internUserId: c.get('userId') }).returning();
  return c.json({ success: true, data: ts }, 201);
});

// NGO
platformRouter.get('/portals/ngo', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const email = await userEmail(db, c.get('userId'));
  const donationRows = email
    ? await db.select().from(donations).where(sql`LOWER(donor_email) = ${email}`).orderBy(desc(donations.createdAt))
    : await db.select().from(donations).orderBy(desc(donations.createdAt)).limit(50);
  const scholarships = await db.select().from(scholarshipApplications).orderBy(desc(scholarshipApplications.createdAt)).limit(50);
  const volunteers = await db.select({ count: count() }).from(volunteerSignups);
  const totalDonated = await db.select({ sum: sql`SUM(amount)` }).from(donations).where(eq(donations.status, 'completed'));
  const awarded = await db.select({ count: count() }).from(scholarshipApplications).where(eq(scholarshipApplications.status, 'awarded'));
  const [recent] = await db.select().from(donations).orderBy(desc(donations.createdAt)).limit(1);
  return c.json({
    success: true,
    data: {
      donations: donationRows,
      scholarships,
      volunteerCount: Number(volunteers[0]?.count ?? 0),
      totalDonated: Number(totalDonated[0]?.sum ?? 0),
      scholarshipsAwarded: Number(awarded[0]?.count ?? 0),
      recentDonation: recent ?? null,
    },
  });
});

// Government (read-only compliance)
platformRouter.get('/portals/government', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const engine = new AnalyticsEngine(db);
  const summary = await engine.getSummary();
  const certRows = await db.select({ count: count() }).from(applications);
  const enrolled = await db.select({ count: count() }).from(enrollments).where(eq(enrollments.status, 'active'));
  const accepted = await db.select({ count: count() }).from(applications).where(eq(applications.status, 'accepted'));
  return c.json({
    success: true,
    data: {
      generatedAt: new Date().toISOString(),
      totalStudents: summary.totalStudents,
      activeEnrollments: summary.activeEnrollments,
      passRate: summary.passRate,
      attendanceRate: summary.attendanceRate,
      courseCompletions: summary.courseCompletions,
      newEnrollmentsThisMonth: summary.newEnrollmentsThisMonth,
      enrolled: Number(enrolled[0]?.count ?? 0),
      applications: Number(certRows[0]?.count ?? 0),
      acceptedApplications: Number(accepted[0]?.count ?? 0),
      avgGrade: summary.avgGrade,
    },
  });
});
