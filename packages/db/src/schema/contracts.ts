import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';
import { contacts } from './crm';

export const contracts = sqliteTable('contracts', {
  id: text('id').primaryKey().$defaultFn(createId),
  title: text('title').notNull(),
  contractNumber: text('contract_number').notNull(),
  clientId: text('client_id').references(() => contacts.id, { onDelete: 'set null' }),
  type: text('type', { enum: ['service', 'employment', 'freelance', 'nda', 'partnership', 'other'] }).default('service'),
  status: text('status', { enum: ['draft', 'pending_signature', 'active', 'completed', 'cancelled', 'expired'] }).default('draft'),
  startDate: text('start_date'),
  endDate: text('end_date'),
  value: real('value'),
  currency: text('currency').default('ZAR'),
  content: text('content'),
  signedByClient: integer('signed_by_client', { mode: 'boolean' }).default(false),
  signedByUs: integer('signed_by_us', { mode: 'boolean' }).default(false),
  signedAt: text('signed_at'),
  createdById: text('created_by_id').references(() => users.id, { onDelete: 'set null' }),
  notes: text('notes'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
  deletedAt: text('deleted_at'),
});

export type Contract = typeof contracts.$inferSelect;
export type NewContract = typeof contracts.$inferInsert;
