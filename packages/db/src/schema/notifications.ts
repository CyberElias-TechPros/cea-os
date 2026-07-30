import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';

export const notifications = sqliteTable('notifications', {
  id: text('id').primaryKey().$defaultFn(createId),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  body: text('body').notNull(),
  icon: text('icon'),
  actionUrl: text('action_url'),
  image: text('image'),
  category: text('category', { enum: ['learning', 'assignments', 'grades', 'attendance', 'finance', 'community', 'events', 'career', 'system', 'security', 'marketing'] }).default('system'),
  channel: text('channel', { enum: ['in_app', 'email', 'sms', 'push'] }).default('in_app'),
  status: text('status', { enum: ['unread', 'read', 'archived'] }).default('unread'),
  priority: text('priority', { enum: ['low', 'medium', 'high', 'urgent'] }).default('medium'),
  templateKey: text('template_key'),
  templateData: text('template_data', { mode: 'json' }).$type<Record<string, unknown>>(),
  sentAt: integer('sent_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  readAt: integer('read_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const notificationTemplates = sqliteTable('notification_templates', {
  id: text('id').primaryKey().$defaultFn(createId),
  key: text('key').notNull().unique(),
  name: text('name').notNull(),
  channels: text('channels', { mode: 'json' }).$type<{ inApp?: { title: string; body: string }; email?: { subject: string; html: string }; sms?: { body: string }; push?: { title: string; body: string } }>(),
  category: text('category', { enum: ['learning', 'assignments', 'grades', 'attendance', 'finance', 'community', 'events', 'career', 'system', 'security', 'marketing'] }).default('system'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;
export type NotificationTemplate = typeof notificationTemplates.$inferSelect;
