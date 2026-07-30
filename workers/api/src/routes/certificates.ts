import { Hono } from 'hono';
import { getDb, certificates, enrollments, courses, users } from '@cea/db';
import { eq } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';
import type { Env } from '..';
import { authMiddleware, requirePermission } from '../middleware/auth';

export const certificatesRouter = new Hono<Env>();

certificatesRouter.post('/issue', authMiddleware, requirePermission('certificates', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  const { enrollmentId } = await c.req.json();

  const [enrollment] = await db.select().from(enrollments).where(eq(enrollments.id, enrollmentId)).limit(1);
  if (!enrollment) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Enrollment not found' } }, 404);

  if (enrollment.status !== 'completed') {
    return c.json({ success: false, error: { code: 'INVALID_STATE', message: 'Course not yet completed' } }, 422);
  }

  const certNumber = `CERT-${Date.now().toString(36).toUpperCase()}-${enrollment.userId.slice(0, 4).toUpperCase()}`;
  const verifCode = createId().slice(0, 12);

  const [cert] = await db.insert(certificates).values({
    userId: enrollment.userId,
    courseId: enrollment.courseId,
    enrollmentId,
    certificateNumber: certNumber,
    verificationCode: verifCode,
    metadata: { finalGrade: enrollment.finalGrade ?? undefined },
  }).returning();

  await db.update(enrollments).set({ certificateIssued: true }).where(eq(enrollments.id, enrollmentId));

  return c.json({ success: true, data: cert }, 201);
});

certificatesRouter.get('/verify/:code', async (c) => {
  const db = getDb(c.env.DB);
  const code = c.req.param('code');

  const [cert] = await db.select().from(certificates).where(eq(certificates.verificationCode, code)).limit(1);
  if (!cert) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Certificate not found' } }, 404);

  const [user] = await db.select().from(users).where(eq(users.id, cert.userId)).limit(1);
  const [course] = await db.select().from(courses).where(eq(courses.id, cert.courseId)).limit(1);

  return c.json({
    success: true,
    data: {
      verified: cert.isVerified,
      certificateNumber: cert.certificateNumber,
      recipientName: user ? `${user.firstName} ${user.lastName}` : 'Unknown',
      courseName: course?.name ?? 'Unknown',
      issuedAt: cert.issuedAt,
      metadata: cert.metadata,
    },
  });
});

certificatesRouter.get('/my', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const certs = await db.select().from(certificates).where(eq(certificates.userId, userId));
  return c.json({ success: true, data: certs });
});
