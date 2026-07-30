import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';

export const contacts = sqliteTable('contacts', {
  id: text('id').primaryKey().$defaultFn(createId),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  company: text('company'),
  title: text('title'),
  source: text('source', { enum: ['website', 'referral', 'walk_in', 'social_media', 'email_campaign', 'event', 'other'] }).default('website'),
  status: text('status', { enum: ['lead', 'qualified', 'proposal', 'negotiation', 'won', 'lost', 'archived'] }).default('lead'),
  type: text('type', { enum: ['prospective_student', 'client', 'partner', 'employer', 'other'] }).default('prospective_student'),
  notes: text('notes'),
  assignedToId: text('assigned_to_id').references(() => users.id, { onDelete: 'set null' }),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
  deletedAt: text('deleted_at'),
});

export const deals = sqliteTable('deals', {
  id: text('id').primaryKey().$defaultFn(createId),
  contactId: text('contact_id').notNull().references(() => contacts.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  value: real('value'),
  currency: text('currency').default('ZAR'),
  stage: text('stage', { enum: ['qualification', 'needs_analysis', 'proposal', 'negotiation', 'closed_won', 'closed_lost'] }).default('qualification'),
  probability: integer('probability').default(0),
  expectedCloseDate: text('expected_close_date'),
  notes: text('notes'),
  assignedToId: text('assigned_to_id').references(() => users.id, { onDelete: 'set null' }),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
  deletedAt: text('deleted_at'),
});

export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;
export type Deal = typeof deals.$inferSelect;
export type NewDeal = typeof deals.$inferInsert;
