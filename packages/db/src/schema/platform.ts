import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';
import { volunteerSignups } from './community';

export const okrs = sqliteTable('okrs', {
  id: text('id').primaryKey().$defaultFn(createId),
  title: text('title').notNull(),
  objective: text('objective'),
  period: text('period').notNull(),
  ownerId: text('owner_id').references(() => users.id, { onDelete: 'set null' }),
  metric: text('metric'),
  target: real('target'),
  current: real('current').default(0),
  status: text('status', { enum: ['on_track', 'at_risk', 'behind', 'completed', 'draft'] }).default('draft'),
  notes: text('notes'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const campaigns = sqliteTable('campaigns', {
  id: text('id').primaryKey().$defaultFn(createId),
  name: text('name').notNull(),
  channel: text('channel', { enum: ['email', 'social', 'content', 'events', 'other'] }).default('email'),
  audience: text('audience'),
  subject: text('subject'),
  content: text('content'),
  status: text('status', { enum: ['draft', 'scheduled', 'sending', 'sent', 'paused'] }).default('draft'),
  scheduledAt: text('scheduled_at'),
  sentAt: text('sent_at'),
  sentCount: integer('sent_count').default(0),
  createdById: text('created_by_id').references(() => users.id, { onDelete: 'set null' }),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const contentCalendar = sqliteTable('content_calendar', {
  id: text('id').primaryKey().$defaultFn(createId),
  title: text('title').notNull(),
  type: text('type', { enum: ['blog', 'video', 'social_post', 'newsletter', 'webinar', 'other'] }).default('blog'),
  platform: text('platform').default('website'),
  publishAt: text('publish_at'),
  status: text('status', { enum: ['idea', 'draft', 'review', 'scheduled', 'published'] }).default('idea'),
  authorId: text('author_id').references(() => users.id, { onDelete: 'set null' }),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const knowledgeBaseArticles = sqliteTable('knowledge_base_articles', {
  id: text('id').primaryKey().$defaultFn(createId),
  title: text('title').notNull(),
  category: text('category', { enum: ['faq', 'troubleshooting', 'howto', 'policy', 'training'] }).default('faq'),
  body: text('body'),
  authorId: text('author_id').references(() => users.id, { onDelete: 'set null' }),
  helpfulCount: integer('helpful_count').default(0),
  published: integer('published', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const webhooks = sqliteTable('webhooks', {
  id: text('id').primaryKey().$defaultFn(createId),
  name: text('name').notNull(),
  url: text('url').notNull(),
  secret: text('secret'),
  events: text('events', { mode: 'json' }).$type<string[]>().default([]),
  enabled: integer('enabled', { mode: 'boolean' }).default(true),
  lastDeliveredAt: text('last_delivered_at'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const newsletterSubscribers = sqliteTable('newsletter_subscribers', {
  id: text('id').primaryKey().$defaultFn(createId),
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  source: text('source').default('footer'),
  status: text('status', { enum: ['subscribed', 'unsubscribed', 'bounced'] }).default('subscribed'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const wardLinks = sqliteTable('ward_links', {
  id: text('id').primaryKey().$defaultFn(createId),
  parentId: text('parent_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  studentUserId: text('student_user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  relation: text('relation').default('guardian'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const internTasks = sqliteTable('intern_tasks', {
  id: text('id').primaryKey().$defaultFn(createId),
  internUserId: text('intern_user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  dueDate: text('due_date'),
  status: text('status', { enum: ['todo', 'in_progress', 'review', 'done'] }).default('todo'),
  assignedById: text('assigned_by_id').references(() => users.id, { onDelete: 'set null' }),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const internTimesheets = sqliteTable('intern_timesheets', {
  id: text('id').primaryKey().$defaultFn(createId),
  internUserId: text('intern_user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  date: text('date').notNull(),
  hours: real('hours').notNull(),
  description: text('description'),
  status: text('status', { enum: ['pending', 'approved', 'rejected'] }).default('pending'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const volunteerHours = sqliteTable('volunteer_hours', {
  id: text('id').primaryKey().$defaultFn(createId),
  volunteerUserId: text('volunteer_user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  signupId: text('signup_id').references(() => volunteerSignups.id, { onDelete: 'set null' }),
  date: text('date').notNull(),
  hours: real('hours').notNull(),
  description: text('description'),
  status: text('status', { enum: ['pending', 'approved', 'rejected'] }).default('pending'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export type Okr = typeof okrs.$inferSelect;
export type Campaign = typeof campaigns.$inferSelect;
export type ContentItem = typeof contentCalendar.$inferSelect;
export type KnowledgeBaseArticle = typeof knowledgeBaseArticles.$inferSelect;
export type Webhook = typeof webhooks.$inferSelect;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type WardLink = typeof wardLinks.$inferSelect;
export type InternTask = typeof internTasks.$inferSelect;
export type InternTimesheet = typeof internTimesheets.$inferSelect;
export type VolunteerHour = typeof volunteerHours.$inferSelect;
