import { Hono } from 'hono';
import { getDb, attendanceRecords, enrollments } from '@cea/db';
import { eq, and, gte, lt } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware, requirePermission } from '../middleware/auth';
import { sendNotification } from '../services/notification';

export const attendanceRouter = new Hono<Env>();

attendanceRouter.post('/check-in', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const { enrollmentId, qrCode } = await c.req.json();
  const markedById = c.get('userId');

  const [enrollment] = await db.select().from(enrollments).where(eq(enrollments.id, enrollmentId)).limit(1);
  if (!enrollment) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Enrollment not found' } }, 404);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const existing = await db.select().from(attendanceRecords).where(
    and(
      eq(attendanceRecords.enrollmentId, enrollmentId),
      gte(attendanceRecords.sessionDate, today),
      lt(attendanceRecords.sessionDate, tomorrow)
    )
  ).limit(1);

  if (existing.length > 0) {
    return c.json({ success: false, error: { code: 'CONFLICT', message: 'Already checked in today' } }, 409);
  }

  const [record] = await db.insert(attendanceRecords).values({
    enrollmentId,
    sessionDate: new Date(),
    status: 'present',
    checkInTime: new Date(),
    checkInMethod: qrCode ? 'qr' : 'manual',
    markedById,
  }).returning();

  return c.json({ success: true, data: record }, 201);
});

attendanceRouter.post('/mark', authMiddleware, requirePermission('attendance', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  const { enrollmentId, status, sessionDate, reason } = await c.req.json();
  const markedById = c.get('userId');

  const [record] = await db.insert(attendanceRecords).values({
    enrollmentId,
    sessionDate: new Date(sessionDate),
    status,
    checkInTime: status === 'present' ? new Date() : null,
    markedById,
    reason,
  }).returning();

  if (status === 'absent') {
    const [enr] = await db.select().from(enrollments).where(eq(enrollments.id, enrollmentId)).limit(1);
    if (enr) {
      await sendNotification(c.env, {
        userId: enr.userId,
        title: 'Absence Marked',
        body: reason ? `Absence recorded: ${reason}` : 'You were marked absent',
        category: 'attendance',
        actionUrl: `/dashboard/attendance`,
        icon: 'calendar-x',
      });
    }
  }

  return c.json({ success: true, data: record }, 201);
});

attendanceRouter.get('/course/:courseId', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const courseId = c.req.param('courseId');

  const enrolled = await db.select().from(enrollments).where(eq(enrollments.courseId, courseId));
  const enrollmentIds = enrolled.map((e) => e.id);

  const records = await db.select().from(attendanceRecords);
  return c.json({ success: true, data: records.filter((r) => enrollmentIds.includes(r.enrollmentId)) });
});
