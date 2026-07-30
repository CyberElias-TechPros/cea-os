import { Hono } from 'hono';
import { getDb } from '@cea/db';
import type { Env } from '..';
import { authMiddleware, requirePermission } from '../middleware/auth';
import { AnalyticsEngine, getRecommendations, generateReport } from '../services/analytics';

export const analyticsRouter = new Hono<Env>();

analyticsRouter.get('/summary', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const engine = new AnalyticsEngine(db);
  const summary = await engine.getSummary();
  return c.json({ success: true, data: summary });
});

analyticsRouter.get('/at-risk', authMiddleware, requirePermission('analytics', 'read'), async (c) => {
  const db = getDb(c.env.DB);
  const engine = new AnalyticsEngine(db);
  const students = await engine.getAtRiskStudents(Number(c.req.query('limit')) || 10);
  return c.json({ success: true, data: students });
});

analyticsRouter.get('/grades/distribution', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const engine = new AnalyticsEngine(db);
  const distribution = await engine.getGradeDistribution();
  return c.json({ success: true, data: distribution });
});

analyticsRouter.get('/enrollments/trends', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const engine = new AnalyticsEngine(db);
  const trends = await engine.getEnrollmentTrends();
  return c.json({ success: true, data: trends });
});

analyticsRouter.get('/courses/top', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const engine = new AnalyticsEngine(db);
  const top = await engine.getTopCourses();
  return c.json({ success: true, data: top });
});

analyticsRouter.get('/recommendations/:type', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const type = c.req.param('type') as 'course' | 'career';
  const recs = await getRecommendations(db, userId, type);
  return c.json({ success: true, data: recs });
});

analyticsRouter.get('/reports/:type', authMiddleware, requirePermission('analytics', 'read'), async (c) => {
  const db = getDb(c.env.DB);
  const report = await generateReport(db, c.req.param('type'));
  return c.json({ success: true, data: report });
});
