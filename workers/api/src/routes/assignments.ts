import { Hono } from 'hono';
import { getDb, assignments, submissions, grades, enrollments, users, courses, modules as mods } from '@cea/db';
import { eq, and, asc, count } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware, requirePermission } from '../middleware/auth';
import { sendNotification, sendNotificationBatch } from '../services/notification';

export const assignmentsRouter = new Hono<Env>();

assignmentsRouter.get('/module/:moduleId', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(assignments).where(eq(assignments.moduleId, c.req.param('moduleId'))).orderBy(asc(assignments.createdAt));
  return c.json({ success: true, data: items });
});

assignmentsRouter.post('/', authMiddleware, requirePermission('assignments', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const userId = c.get('userId');
  const [assignment] = await db.insert(assignments).values({ ...body, createdById: userId }).returning();

  const enrolled = await db.select({ userId: enrollments.userId }).from(enrollments)
    .innerJoin(mods, eq(mods.id, assignment!.moduleId))
    .where(eq(enrollments.courseId, body.courseId));
  if (enrolled.length > 0) {
    await sendNotificationBatch(c.env, enrolled.map(e => ({
      userId: e.userId,
      title: 'New Assignment',
      body: `"${assignment!.title}" has been posted`,
      category: 'assignments',
      actionUrl: `/learn/${assignment!.moduleId}`,
      icon: 'clipboard',
    })));
  }

  return c.json({ success: true, data: assignment }, 201);
});

assignmentsRouter.patch('/:id', authMiddleware, requirePermission('assignments', 'update'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  await db.update(assignments).set(body).where(eq(assignments.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Assignment updated' } });
});

assignmentsRouter.post('/:id/submit', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const assignmentId = c.req.param('id');
  const userId = c.get('userId');
  const body = await c.req.json();

  const existing = await db.select({ value: count() }).from(submissions).where(
    and(eq(submissions.assignmentId, assignmentId), eq(submissions.userId, userId))
  );
  const attempt = (existing[0]?.value ?? 0) + 1;

  const [submission] = await db.insert(submissions).values({
    assignmentId,
    userId,
    attempt,
    content: body.content,
    textEntry: body.textEntry,
    url: body.url,
    codeRepoUrl: body.codeRepoUrl,
    submittedAt: new Date(),
    status: 'submitted',
  }).returning();

  return c.json({ success: true, data: submission }, 201);
});

assignmentsRouter.get('/:id/submissions', authMiddleware, requirePermission('assignments', 'read'), async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(submissions).where(eq(submissions.assignmentId, c.req.param('id')));
  return c.json({ success: true, data: items });
});

assignmentsRouter.post('/submissions/:id/grade', authMiddleware, requirePermission('assignments', 'update'), async (c) => {
  const db = getDb(c.env.DB);
  const submissionId = c.req.param('id');
  const graderId = c.get('userId');
  const { score, pointsPossible, feedback } = await c.req.json();

  const [submission] = await db.select().from(submissions).where(eq(submissions.id, submissionId)).limit(1);
  if (!submission) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Submission not found' } }, 404);

  await db.update(submissions).set({ status: 'graded' }).where(eq(submissions.id, submissionId));

  const [enrollment] = await db.select().from(enrollments).where(
    and(eq(enrollments.userId, submission.userId), eq(enrollments.id, c.req.query('enrollmentId') ?? ''))
  ).limit(1);

  const percentage = (score / pointsPossible) * 100;
  const [grade] = await db.insert(grades).values({
    enrollmentId: enrollment?.id ?? '',
    gradedItemId: submission.assignmentId,
    gradedItemType: 'assignment',
    graderId,
    score,
    pointsPossible,
    percentage,
    isPassing: percentage >= 60,
    feedback,
  }).returning();

  await sendNotification(c.env, {
    userId: submission.userId,
    title: 'Assignment Graded',
    body: `Your submission scored ${score}/${pointsPossible} (${Math.round(percentage)}%)`,
    category: 'grades',
    actionUrl: `/learn/assignments/${submission.assignmentId}`,
    icon: 'check-circle',
  });

  return c.json({ success: true, data: grade }, 201);
});
