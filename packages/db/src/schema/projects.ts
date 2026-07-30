import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';
import { contacts } from './crm';

export const projects = sqliteTable('projects', {
  id: text('id').primaryKey().$defaultFn(createId),
  name: text('name').notNull(),
  description: text('description'),
  clientId: text('client_id').references(() => contacts.id, { onDelete: 'set null' }),
  status: text('status', { enum: ['planning', 'active', 'on_hold', 'completed', 'cancelled'] }).default('planning'),
  priority: text('priority', { enum: ['low', 'medium', 'high', 'urgent'] }).default('medium'),
  startDate: text('start_date'),
  endDate: text('end_date'),
  budget: text('budget'),
  currency: text('currency').default('ZAR'),
  managerId: text('manager_id').references(() => users.id, { onDelete: 'set null' }),
  notes: text('notes'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
  deletedAt: text('deleted_at'),
});

export const projectTasks = sqliteTable('project_tasks', {
  id: text('id').primaryKey().$defaultFn(createId),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status', { enum: ['todo', 'in_progress', 'review', 'done', 'cancelled'] }).default('todo'),
  priority: text('priority', { enum: ['low', 'medium', 'high', 'urgent'] }).default('medium'),
  assigneeId: text('assignee_id').references(() => users.id, { onDelete: 'set null' }),
  dueDate: text('due_date'),
  orderIndex: integer('order_index').default(0),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
  deletedAt: text('deleted_at'),
});

export const milestones = sqliteTable('milestones', {
  id: text('id').primaryKey().$defaultFn(createId),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  dueDate: text('due_date'),
  status: text('status', { enum: ['pending', 'in_progress', 'completed', 'cancelled'] }).default('pending'),
  orderIndex: integer('order_index').default(0),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const projectTeamMembers = sqliteTable('project_team_members', {
  id: text('id').primaryKey().$defaultFn(createId),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: text('role', { enum: ['manager', 'lead', 'member', 'reviewer', 'client'] }).default('member'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type ProjectTask = typeof projectTasks.$inferSelect;
export type NewProjectTask = typeof projectTasks.$inferInsert;
export type Milestone = typeof milestones.$inferSelect;
export type NewMilestone = typeof milestones.$inferInsert;
export type ProjectTeamMember = typeof projectTeamMembers.$inferSelect;
export type NewProjectTeamMember = typeof projectTeamMembers.$inferInsert;
