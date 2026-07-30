import { Hono } from 'hono';
import { getDb, assessments, assessmentQuestions, assessmentAttempts, assessmentResponses, grades, enrollments } from '@cea/db';
import { eq, and, asc, count } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware, requirePermission } from '../middleware/auth';
import { sendNotification } from '../services/notification';

export const assessmentsRouter = new Hono<Env>();

assessmentsRouter.get('/module/:moduleId', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(assessments).where(eq(assessments.moduleId, c.req.param('moduleId')));
  return c.json({ success: true, data: items });
});

assessmentsRouter.post('/', authMiddleware, requirePermission('assessments', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const userId = c.get('userId');
  const [assessment] = await db.insert(assessments).values({ ...body, createdById: userId }).returning();
  return c.json({ success: true, data: assessment }, 201);
});

assessmentsRouter.get('/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const id = c.req.param('id');
  const [assessment] = await db.select().from(assessments).where(eq(assessments.id, id)).limit(1);
  if (!assessment) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Assessment not found' } }, 404);

  const questions = await db.select().from(assessmentQuestions).where(eq(assessmentQuestions.assessmentId, id)).orderBy(asc(assessmentQuestions.orderIndex));

  const safeQuestions = questions.map((q) => {
    if (assessment.type === 'exam' || assessment.showResults === false) {
      const { correctAnswer, ...rest } = q;
      return rest;
    }
    return q;
  });

  return c.json({ success: true, data: { ...assessment, questions: safeQuestions } });
});

assessmentsRouter.post('/:id/questions', authMiddleware, requirePermission('assessments', 'update'), async (c) => {
  const db = getDb(c.env.DB);
  const assessmentId = c.req.param('id');
  const body = await c.req.json();

  const existing = await db.select({ value: count() }).from(assessmentQuestions).where(eq(assessmentQuestions.assessmentId, assessmentId));
  const [question] = await db.insert(assessmentQuestions).values({
    assessmentId, ...body,
    orderIndex: body.orderIndex ?? ((existing[0]?.value ?? 0)),
  }).returning();

  return c.json({ success: true, data: question }, 201);
});

assessmentsRouter.post('/:id/start', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const assessmentId = c.req.param('id');
  const userId = c.get('userId');

  const existing = await db.select({ value: count() }).from(assessmentAttempts).where(
    and(eq(assessmentAttempts.assessmentId, assessmentId), eq(assessmentAttempts.userId, userId))
  );

  const [attempt] = await db.insert(assessmentAttempts).values({
    assessmentId, userId,
    attempt: (existing[0]?.value ?? 0) + 1,
    status: 'in_progress',
  }).returning();

  return c.json({ success: true, data: attempt }, 201);
});

assessmentsRouter.post('/attempts/:id/submit', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const attemptId = c.req.param('id');
  const { responses } = await c.req.json<{ responses: { questionId: string; response: unknown }[] }>();

  const [attempt] = await db.select().from(assessmentAttempts).where(eq(assessmentAttempts.id, attemptId)).limit(1);
  if (!attempt) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Attempt not found' } }, 404);

  const questions = await db.select().from(assessmentQuestions).where(eq(assessmentQuestions.assessmentId, attempt.assessmentId));

  let totalScore = 0;
  let totalPoints = 0;

  for (const question of questions) {
    const userResponse = responses.find((r) => r.questionId === question.id);
    const isCorrect = userResponse ? String(userResponse.response) === String(question.correctAnswer) : false;
    const pointsAwarded = isCorrect ? question.points : 0;
    totalScore += pointsAwarded ?? 0;
    totalPoints += question.points ?? 0;

    await db.insert(assessmentResponses).values({
      attemptId,
      questionId: question.id,
      response: userResponse?.response ?? null,
      isCorrect,
      pointsAwarded,
    });
  }

  const percentage = totalPoints > 0 ? (totalScore / totalPoints) * 100 : 0;
  const passed = percentage >= (attempt.percentage ?? 60);

  await db.update(assessmentAttempts).set({
    status: 'graded',
    submittedAt: new Date(),
    score: totalScore,
    totalPoints,
    percentage,
    passed,
  }).where(eq(assessmentAttempts.id, attemptId));

  await sendNotification(c.env, {
    userId: attempt.userId,
    title: passed ? 'Assessment Passed' : 'Assessment Needs Review',
    body: `Score: ${totalScore}/${totalPoints} (${Math.round(percentage)}%)`,
    category: 'grades',
    actionUrl: `/learn/assessments/${attempt.assessmentId}`,
    icon: passed ? 'check-circle' : 'alert-circle',
  });

  return c.json({ success: true, data: { score: totalScore, totalPoints, percentage, passed } });
});

assessmentsRouter.get('/attempts/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const attemptId = c.req.param('id');
  const [attempt] = await db.select().from(assessmentAttempts).where(eq(assessmentAttempts.id, attemptId)).limit(1);
  if (!attempt) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Attempt not found' } }, 404);

  const responses = await db.select().from(assessmentResponses).where(eq(assessmentResponses.attemptId, attemptId));
  return c.json({ success: true, data: { ...attempt, responses } });
});
