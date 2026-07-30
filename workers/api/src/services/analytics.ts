import { getDb, enrollments, grades, attendanceRecords } from '@cea/db';
import { eq, and, desc, count, avg, gte } from 'drizzle-orm';
import { sql } from 'drizzle-orm';

export interface AtRiskStudent {
  userId: string;
  riskScore: number;
  factors: string[];
}

export interface CourseRecommendation {
  courseId: string;
  score: number;
  reason: string;
}

export interface AnalyticsSummary {
  totalStudents: number;
  activeEnrollments: number;
  avgGrade: number | null;
  passRate: number | null;
  attendanceRate: number | null;
  courseCompletions: number;
  revenue: number;
  newEnrollmentsThisMonth: number;
}

export class AnalyticsEngine {
  constructor(private db: ReturnType<typeof getDb>) {}

  async getSummary(): Promise<AnalyticsSummary> {
    const enrollmentRows = await this.db.select({ count: count() }).from(enrollments);
    const totalStudents = enrollmentRows[0]?.count || 0;

    const activeRows = await this.db.select({ count: count() }).from(enrollments).where(eq(enrollments.status, 'active'));
    const activeCount = activeRows[0]?.count || 0;

    const avgRows = await this.db.select({ avg: avg(grades.score) }).from(grades);
    const avgGradeVal = avgRows[0]?.avg ?? null;

    const passingRows = await this.db.select({ count: count() }).from(grades).where(gte(grades.score, 50));
    const totalGradeRows = await this.db.select({ count: count() }).from(grades);
    const passRate = totalGradeRows[0]?.count && totalGradeRows[0].count > 0
      ? Math.round(((passingRows[0]?.count || 0) / totalGradeRows[0].count) * 100)
      : null;

    const presentRows = await this.db.select({ count: count() }).from(attendanceRecords).where(eq(attendanceRecords.status, 'present'));
    const totalAttRows = await this.db.select({ count: count() }).from(attendanceRecords);
    const attendanceRate = totalAttRows[0]?.count && totalAttRows[0].count > 0
      ? Math.round(((presentRows[0]?.count || 0) / totalAttRows[0].count) * 100)
      : null;

    const completionRows = await this.db.select({ count: count() }).from(enrollments).where(eq(enrollments.status, 'completed'));
    const courseCompletions = completionRows[0]?.count || 0;

    const thisMonth = new Date().toISOString().substring(0, 7);
    const newRows = await this.db.select({ count: count() }).from(enrollments).where(sql`strftime('%Y-%m', created_at) = ${thisMonth}`);
    const newEnrollmentsThisMonth = newRows[0]?.count || 0;

    return {
      totalStudents, activeEnrollments: activeCount, avgGrade: Number(avgGradeVal) || null,
      passRate, attendanceRate, courseCompletions, revenue: 0, newEnrollmentsThisMonth,
    };
  }

  async getAtRiskStudents(limit = 10): Promise<AtRiskStudent[]> {
    const allEnrollments = await this.db.select().from(enrollments).where(eq(enrollments.status, 'active'));
    const results: AtRiskStudent[] = [];

    for (const enrollment of allEnrollments.slice(0, 50)) {
      const factors: string[] = [];
      let riskScore = 0;

      const gradeRows = await this.db.select({ avg: avg(grades.score) }).from(grades)
        .where(eq(grades.enrollmentId, enrollment.id));
      const avgG = Number(gradeRows[0]?.avg);
      if (!isNaN(avgG)) {
        if (avgG < 40) { riskScore += 30; factors.push(`Low avg grade: ${Math.round(avgG)}%`); }
        else if (avgG < 60) { riskScore += 15; factors.push(`Below avg grade: ${Math.round(avgG)}%`); }
      }

      const attRows = await this.db.select({ count: count() }).from(attendanceRecords)
        .where(and(eq(attendanceRecords.enrollmentId, enrollment.id), eq(attendanceRecords.status, 'absent')));
      const absences = attRows[0]?.count || 0;
      if (absences > 3) { riskScore += 25; factors.push(`High absences: ${absences}`); }
      else if (absences > 1) { riskScore += 10; factors.push(`Multiple absences: ${absences}`); }

      const subRows = await this.db.select({ count: count() }).from(grades)
        .where(eq(grades.enrollmentId, enrollment.id));
      if (!subRows[0]?.count || subRows[0].count === 0) { riskScore += 20; factors.push('No graded work'); }

      if (riskScore > 0) {
        results.push({ userId: enrollment.userId, riskScore: Math.min(riskScore, 100), factors });
      }
    }

    return results.sort((a, b) => b.riskScore - a.riskScore).slice(0, limit);
  }

  async getGradeDistribution(): Promise<{ range: string; count: number }[]> {
    const bins = ['0-20', '21-40', '41-60', '61-80', '81-100'] as const;
    const allGrades = await this.db.select({ score: grades.score }).from(grades);
    const distribution = bins.map(range => {
      const parts = range.split('-').map(Number);
      const low = parts[0]!;
      const high = parts[1]!;
      return { range, count: allGrades.filter(g => g.score !== null && Number(g.score) >= low && Number(g.score) <= high).length };
    });
    return distribution;
  }

  async getEnrollmentTrends(): Promise<{ month: string; count: number }[]> {
    const rows = await this.db.select({
      month: sql`strftime('%Y-%m', created_at)`,
      count: count(),
    }).from(enrollments).groupBy(sql`strftime('%Y-%m', created_at)`).orderBy(sql`strftime('%Y-%m', created_at)`);
    return rows as unknown as { month: string; count: number }[];
  }

  async getTopCourses() {
    return this.db.select({
      courseId: enrollments.courseId,
      enrollmentCount: count(),
      avgGrade: avg(grades.score),
    }).from(enrollments)
      .leftJoin(grades, eq(grades.enrollmentId, enrollments.id))
      .groupBy(enrollments.courseId)
      .orderBy(desc(count()))
      .limit(10);
  }
}

export async function getRecommendations(
  db: ReturnType<typeof getDb>,
  userId: string,
  type: 'course' | 'career'
): Promise<CourseRecommendation[]> {
  const userEnrollments = await db.select({ courseId: enrollments.courseId }).from(enrollments).where(eq(enrollments.userId, userId));
  const enrolledCourseIds = new Set(userEnrollments.map(e => e.courseId));

  const allCourses = await db.select({ id: enrollments.courseId, count: count() }).from(enrollments)
    .groupBy(enrollments.courseId).orderBy(desc(count())).limit(20);

  return allCourses
    .filter(c => !enrolledCourseIds.has(c.id))
    .slice(0, 5)
    .map(c => ({
      courseId: c.id,
      score: Math.min(Math.round((c.count / (allCourses[0]?.count || 1)) * 100), 100),
      reason: type === 'course' ? 'Popular among peers' : 'Relevant career path',
    }));
}

export async function generateReport(
  db: ReturnType<typeof getDb>,
  type: string
): Promise<{ title: string; data: unknown; generatedAt: string }> {
  const engine = new AnalyticsEngine(db);
  const summary = await engine.getSummary();
  const gradeDist = await engine.getGradeDistribution();
  const trends = await engine.getEnrollmentTrends();

  return {
    title: `${type} Report`,
    data: { summary, gradeDistribution: gradeDist, enrollmentTrends: trends },
    generatedAt: new Date().toISOString(),
  };
}
