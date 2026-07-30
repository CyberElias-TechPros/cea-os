import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';

export const supportTickets = sqliteTable('support_tickets', {
  id: text('id').primaryKey().$defaultFn(createId),
  title: text('title').notNull(),
  description: text('description').notNull(),
  category: text('category', { enum: ['technical', 'billing', 'account', 'course_content', 'general', 'other'] }).default('general'),
  priority: text('priority', { enum: ['low', 'medium', 'high', 'urgent'] }).default('medium'),
  status: text('status', { enum: ['open', 'in_progress', 'waiting_on_customer', 'resolved', 'closed'] }).default('open'),
  requesterId: text('requester_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  assigneeId: text('assignee_id').references(() => users.id, { onDelete: 'set null' }),
  slaDeadline: text('sla_deadline'),
  resolvedAt: text('resolved_at'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
  deletedAt: text('deleted_at'),
});

export const ticketMessages = sqliteTable('ticket_messages', {
  id: text('id').primaryKey().$defaultFn(createId),
  ticketId: text('ticket_id').notNull().references(() => supportTickets.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  message: text('message').notNull(),
  isInternal: integer('is_internal', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export type SupportTicket = typeof supportTickets.$inferSelect;
export type NewSupportTicket = typeof supportTickets.$inferInsert;
export type TicketMessage = typeof ticketMessages.$inferSelect;
export type NewTicketMessage = typeof ticketMessages.$inferInsert;
