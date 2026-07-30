import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';

export const auditLogs = sqliteTable('audit_logs', {
  id: text('id').primaryKey().$defaultFn(createId),
  userId: text('user_id').references(() => users.id),
  sessionId: text('session_id'),
  action: text('action').notNull(),
  resource: text('resource').notNull(),
  resourceId: text('resource_id'),
  details: text('details', { mode: 'json' }).$type<Record<string, unknown>>(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  severity: text('severity', { enum: ['info', 'warning', 'error', 'critical'] }).default('info'),
  immutable: integer('immutable', { mode: 'boolean' }).default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export type AuditLog = typeof auditLogs.$inferSelect;
