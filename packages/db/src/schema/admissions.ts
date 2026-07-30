import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';
import { programs } from './learning';

export const applications = sqliteTable('applications', {
  id: text('id').primaryKey().$defaultFn(createId),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  programId: text('program_id').references(() => programs.id, { onDelete: 'set null' }),
  status: text('status', { enum: ['draft', 'submitted', 'under_review', 'shortlisted', 'interview_scheduled', 'offer_made', 'accepted', 'rejected', 'withdrawn'] }).default('draft'),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  dateOfBirth: text('date_of_birth'),
  address: text('address'),
  educationLevel: text('education_level'),
  previousSchool: text('previous_school'),
  motivation: text('motivation'),
  notes: text('notes'),
  assignedToId: text('assigned_to_id').references(() => users.id, { onDelete: 'set null' }),
  submittedAt: text('submitted_at'),
  decisionAt: text('decision_at'),
  decidedById: text('decided_by_id').references(() => users.id, { onDelete: 'set null' }),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
  deletedAt: text('deleted_at'),
});

export const applicationDocuments = sqliteTable('application_documents', {
  id: text('id').primaryKey().$defaultFn(createId),
  applicationId: text('application_id').notNull().references(() => applications.id, { onDelete: 'cascade' }),
  type: text('type', { enum: ['id_document', 'transcript', 'certificate', 'recommendation', 'portfolio', 'other'] }).notNull(),
  fileName: text('file_name').notNull(),
  fileUrl: text('file_url').notNull(),
  verified: integer('verified', { mode: 'boolean' }).default(false),
  verifiedById: text('verified_by_id').references(() => users.id, { onDelete: 'set null' }),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const offers = sqliteTable('offers', {
  id: text('id').primaryKey().$defaultFn(createId),
  applicationId: text('application_id').notNull().references(() => applications.id, { onDelete: 'cascade' }),
  programId: text('program_id').references(() => programs.id, { onDelete: 'set null' }),
  status: text('status', { enum: ['draft', 'sent', 'accepted', 'declined', 'expired'] }).default('draft'),
  tuitionFee: real('tuition_fee'),
  scholarshipAmount: real('scholarship_amount').default(0),
  validUntil: text('valid_until'),
  notes: text('notes'),
  sentAt: text('sent_at'),
  respondedAt: text('responded_at'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;
export type ApplicationDocument = typeof applicationDocuments.$inferSelect;
export type Offer = typeof offers.$inferSelect;
