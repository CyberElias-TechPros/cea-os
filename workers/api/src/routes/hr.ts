import { Hono } from 'hono';
import { getDb, departments, branches, employees, leaveRequests, staffAttendance, performanceReviews } from '@cea/db';
import { eq, and, desc, asc } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware, requirePermission } from '../middleware/auth';

export const hrRouter = new Hono<Env>();

hrRouter.get('/departments', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(departments).orderBy(asc(departments.name));
  return c.json({ success: true, data: items });
});

hrRouter.post('/departments', authMiddleware, requirePermission('hr', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [dept] = await db.insert(departments).values(body).returning();
  return c.json({ success: true, data: dept }, 201);
});

hrRouter.get('/branches', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(branches).orderBy(asc(branches.name));
  return c.json({ success: true, data: items });
});

hrRouter.post('/branches', authMiddleware, requirePermission('hr', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [branch] = await db.insert(branches).values(body).returning();
  return c.json({ success: true, data: branch }, 201);
});

hrRouter.get('/employees', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(employees).where(sql`deleted_at IS NULL`).orderBy(asc(employees.employeeCode));
  return c.json({ success: true, data: items });
});

hrRouter.get('/employees/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const [emp] = await db.select().from(employees).where(eq(employees.id, c.req.param('id'))).limit(1);
  if (!emp) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Employee not found' } }, 404);
  return c.json({ success: true, data: emp });
});

hrRouter.post('/employees', authMiddleware, requirePermission('hr', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [emp] = await db.insert(employees).values(body).returning();
  return c.json({ success: true, data: emp }, 201);
});

hrRouter.patch('/employees/:id', authMiddleware, requirePermission('hr', 'update'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  await db.update(employees).set({ ...body, updatedAt: new Date().toISOString() }).where(eq(employees.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Employee updated' } });
});

hrRouter.get('/leave', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const [emp] = await db.select().from(employees).where(eq(employees.userId, userId)).limit(1);
  if (!emp) return c.json({ success: true, data: [] });
  const items = await db.select().from(leaveRequests).where(eq(leaveRequests.employeeId, emp.id)).orderBy(desc(leaveRequests.createdAt));
  return c.json({ success: true, data: items });
});

hrRouter.post('/leave', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const [emp] = await db.select().from(employees).where(eq(employees.userId, userId)).limit(1);
  if (!emp) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Employee profile not found' } }, 404);
  const body = await c.req.json();
  const [req] = await db.insert(leaveRequests).values({ ...body, employeeId: emp.id }).returning();
  return c.json({ success: true, data: req }, 201);
});

hrRouter.post('/leave/:id/decide', authMiddleware, requirePermission('hr', 'update'), async (c) => {
  const db = getDb(c.env.DB);
  const { approved } = await c.req.json();
  const status = approved ? 'approved' : 'rejected';
  await db.update(leaveRequests).set({ status, approvedById: c.get('userId'), approvedAt: new Date().toISOString(), updatedAt: new Date().toISOString() }).where(eq(leaveRequests.id, c.req.param('id')));
  return c.json({ success: true, data: { message: `Leave ${status}` } });
});

hrRouter.get('/attendance', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const { date, employeeId } = c.req.query();
  const conditions: any[] = [];
  if (date) conditions.push(eq(staffAttendance.date, date));
  if (employeeId) conditions.push(eq(staffAttendance.employeeId, employeeId));
  const items = await db.select().from(staffAttendance).where(and(...conditions)).orderBy(desc(staffAttendance.date));
  return c.json({ success: true, data: items });
});

hrRouter.post('/attendance', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();
  const [record] = await db.insert(staffAttendance).values({ ...body, markedById: userId }).returning();
  return c.json({ success: true, data: record }, 201);
});

hrRouter.get('/reviews', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const [emp] = await db.select().from(employees).where(eq(employees.userId, userId)).limit(1);
  if (!emp) return c.json({ success: true, data: [] });
  const items = await db.select().from(performanceReviews).where(eq(performanceReviews.employeeId, emp.id)).orderBy(desc(performanceReviews.createdAt));
  return c.json({ success: true, data: items });
});

hrRouter.post('/reviews', authMiddleware, requirePermission('hr', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();
  const [review] = await db.insert(performanceReviews).values({ ...body, reviewerId: userId }).returning();
  return c.json({ success: true, data: review }, 201);
});
