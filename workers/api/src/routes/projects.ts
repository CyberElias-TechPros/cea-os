import { Hono } from 'hono';
import { getDb, projects, projectTasks, milestones, projectTeamMembers } from '@cea/db';
import { eq, and, asc, desc } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware, requirePermission } from '../middleware/auth';

export const projectsRouter = new Hono<Env>();

projectsRouter.get('/', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(projects).where(sql`deleted_at IS NULL`).orderBy(desc(projects.createdAt));
  return c.json({ success: true, data: items });
});

projectsRouter.get('/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const [project] = await db.select().from(projects).where(eq(projects.id, c.req.param('id'))).limit(1);
  if (!project) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Project not found' } }, 404);
  const tasks = await db.select().from(projectTasks).where(eq(projectTasks.projectId, project.id)).orderBy(asc(projectTasks.orderIndex));
  const ms = await db.select().from(milestones).where(eq(milestones.projectId, project.id)).orderBy(asc(milestones.orderIndex));
  const team = await db.select().from(projectTeamMembers).where(eq(projectTeamMembers.projectId, project.id));
  return c.json({ success: true, data: { ...project, tasks, milestones: ms, team } });
});

projectsRouter.post('/', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [project] = await db.insert(projects).values(body).returning();
  return c.json({ success: true, data: project }, 201);
});

projectsRouter.patch('/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  await db.update(projects).set({ ...body, updatedAt: new Date().toISOString() }).where(eq(projects.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Project updated' } });
});

projectsRouter.delete('/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  await db.update(projects).set({ deletedAt: new Date().toISOString() }).where(eq(projects.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Project deleted' } });
});

projectsRouter.post('/:id/tasks', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [task] = await db.insert(projectTasks).values({ projectId: c.req.param('id'), ...body }).returning();
  return c.json({ success: true, data: task }, 201);
});

projectsRouter.patch('/tasks/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  await db.update(projectTasks).set({ ...body, updatedAt: new Date().toISOString() }).where(eq(projectTasks.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Task updated' } });
});

projectsRouter.delete('/tasks/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  await db.delete(projectTasks).where(eq(projectTasks.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Task deleted' } });
});

projectsRouter.post('/:id/milestones', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [milestone] = await db.insert(milestones).values({ projectId: c.req.param('id'), ...body }).returning();
  return c.json({ success: true, data: milestone }, 201);
});

projectsRouter.patch('/milestones/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  await db.update(milestones).set({ ...body, updatedAt: new Date().toISOString() }).where(eq(milestones.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Milestone updated' } });
});

projectsRouter.post('/:id/team', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [member] = await db.insert(projectTeamMembers).values({ projectId: c.req.param('id'), ...body }).returning();
  return c.json({ success: true, data: member }, 201);
});

projectsRouter.delete('/team/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  await db.delete(projectTeamMembers).where(eq(projectTeamMembers.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Team member removed' } });
});
