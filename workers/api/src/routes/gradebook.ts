import { Hono } from 'hono';
import { getDb, enrollments, grades, courses, users } from '@cea/db';
import { eq, and, asc } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware, requireRole } from '../middleware/auth';

export const gradebookRouter = new Hono<Env>();

// Only faculty/staff may view a whole course's gradebook.
gradebookRouter.get('/course/:courseId', authMiddleware, requireRole('admin', 'staff', 'instructor'), async (c) => {
  const db = getDb(c.env.DB);
  const courseId = c.req.param('courseId');

  const enrolled = await db.select().from(enrollments).where(
    and(eq(enrollments.courseId, courseId), eq(enrollments.status, 'active'))
  );

  const data = await Promise.all(enrolled.map(async (enr) => {
    const [user] = await db.select().from(users).where(eq(users.id, enr.userId)).limit(1);
    const gradeRecords = await db.select().from(grades).where(eq(grades.enrollmentId, enr.id));
    return {
      enrollment: enr,
      user: user ? { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email } : null,
      grades: gradeRecords,
    };
  }));

  return c.json({ success: true, data });
});

gradebookRouter.get('/my', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');

  const myEnrollments = await db.select().from(enrollments).where(eq(enrollments.userId, userId));
  const data = await Promise.all(myEnrollments.map(async (enr) => {
    const [course] = await db.select().from(courses).where(eq(courses.id, enr.courseId)).limit(1);
    const gradeRecords = await db.select().from(grades).where(eq(grades.enrollmentId, enr.id));
    return { enrollment: enr, course: course ?? null, grades: gradeRecords };
  }));

  return c.json({ success: true, data });
});
