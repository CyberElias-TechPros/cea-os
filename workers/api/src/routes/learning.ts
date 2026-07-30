import { Hono } from 'hono';
import { getDb } from '@cea/db';
import { courses, modules, lessons, courseInstructors, enrollments } from '@cea/db';
import { eq, asc, and, count } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware, requirePermission } from '../middleware/auth';
import { audit } from '../middleware/audit';

export const coursesRouter = new Hono<Env>();

coursesRouter.get('/', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const all = await db.select().from(courses).orderBy(asc(courses.createdAt));
  return c.json({ success: true, data: all });
});

coursesRouter.get('/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const id = c.req.param('id');
  const [course] = await db.select().from(courses).where(eq(courses.id, id)).limit(1);
  if (!course) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Course not found' } }, 404);

  const mods = await db.select().from(modules).where(eq(modules.courseId, id)).orderBy(asc(modules.orderIndex));
  return c.json({ success: true, data: { ...course, modules: mods } });
});

coursesRouter.post('/', authMiddleware, requirePermission('courses', 'create'), audit('create', 'courses'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const userId = c.get('userId');

  const inserted = await db.insert(courses).values({ ...body, createdById: userId }).returning();
  const course = inserted[0]!;
  await db.insert(courseInstructors).values({ courseId: course.id, userId, role: 'primary' });

  return c.json({ success: true, data: course }, 201);
});

coursesRouter.patch('/:id', authMiddleware, requirePermission('courses', 'update'), audit('update', 'courses'), async (c) => {
  const db = getDb(c.env.DB);
  const id = c.req.param('id');
  const body = await c.req.json();
  await db.update(courses).set(body).where(eq(courses.id, id));
  return c.json({ success: true, data: { message: 'Course updated' } });
});

coursesRouter.delete('/:id', authMiddleware, requirePermission('courses', 'delete'), audit('delete', 'courses'), async (c) => {
  const db = getDb(c.env.DB);
  const id = c.req.param('id');
  await db.update(courses).set({ status: 'archived' }).where(eq(courses.id, id));
  return c.json({ success: true, data: { message: 'Course archived' } });
});

coursesRouter.get('/:id/modules', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const courseId = c.req.param('id');
  const mods = await db.select().from(modules).where(eq(modules.courseId, courseId)).orderBy(asc(modules.orderIndex));
  return c.json({ success: true, data: mods });
});

coursesRouter.post('/:id/modules', authMiddleware, requirePermission('courses', 'update'), async (c) => {
  const db = getDb(c.env.DB);
  const courseId = c.req.param('id');
  const body = await c.req.json();

  const existing = await db.select({ value: count() }).from(modules).where(eq(modules.courseId, courseId));
  const orderIndex = body.orderIndex ?? (existing[0]?.value ?? 0);

  const [mod] = await db.insert(modules).values({ courseId, title: body.title, description: body.description, orderIndex }).returning();
  return c.json({ success: true, data: mod }, 201);
});

export const lessonsRouter = new Hono<Env>();

lessonsRouter.get('/:moduleId/lessons', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(lessons).where(eq(lessons.moduleId, c.req.param('moduleId'))).orderBy(asc(lessons.orderIndex));
  return c.json({ success: true, data: items });
});

lessonsRouter.post('/:moduleId/lessons', authMiddleware, requirePermission('courses', 'update'), async (c) => {
  const db = getDb(c.env.DB);
  const moduleId = c.req.param('moduleId');
  const body = await c.req.json();
  const userId = c.get('userId');

  const existing = await db.select({ value: count() }).from(lessons).where(eq(lessons.moduleId, moduleId));
  const orderIndex = body.orderIndex ?? (existing[0]?.value ?? 0);

  const [lesson] = await db.insert(lessons).values({ moduleId, ...body, orderIndex, createdById: userId }).returning();
  return c.json({ success: true, data: lesson }, 201);
});

export const enrollmentsRouter = new Hono<Env>();

enrollmentsRouter.post('/', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const { courseId } = await c.req.json<{ courseId: string }>();

  const existing = await db.select().from(enrollments).where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, courseId))).limit(1);
  if (existing.length > 0) {
    return c.json({ success: false, error: { code: 'CONFLICT', message: 'Already enrolled' } }, 409);
  }

  const [enrollment] = await db.insert(enrollments).values({ userId, courseId }).returning();
  return c.json({ success: true, data: enrollment }, 201);
});

enrollmentsRouter.get('/', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const items = await db.select().from(enrollments).where(eq(enrollments.userId, userId));
  return c.json({ success: true, data: items });
});

enrollmentsRouter.patch('/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const id = c.req.param('id');
  const body = await c.req.json();
  await db.update(enrollments).set(body).where(eq(enrollments.id, id));
  return c.json({ success: true, data: { message: 'Enrollment updated' } });
});
