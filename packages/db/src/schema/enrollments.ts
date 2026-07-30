import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';
import { courses } from './learning';

export const enrollments = sqliteTable('enrollments', {
  id: text('id').primaryKey().$defaultFn(createId),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  courseId: text('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  type: text('type', { enum: ['full_time', 'part_time', 'self_paced', 'audit'] }).default('self_paced'),
  status: text('status', { enum: ['active', 'completed', 'dropped', 'pending', 'expired'] }).default('active'),
  enrolledAt: integer('enrolled_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  startedAt: integer('started_at', { mode: 'timestamp' }),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
  progress: integer('progress').default(0),
  finalGrade: real('final_grade'),
  passed: integer('passed', { mode: 'boolean' }),
  certificateIssued: integer('certificate_issued', { mode: 'boolean' }).default(false),
  paymentStatus: text('payment_status', { enum: ['pending', 'partial', 'paid', 'refunded'] }).default('pending'),
  feePaid: real('fee_paid'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date()),
});

export const progressTracking = sqliteTable('progress_tracking', {
  id: text('id').primaryKey().$defaultFn(createId),
  enrollmentId: text('enrollment_id').notNull().references(() => enrollments.id, { onDelete: 'cascade' }),
  lessonId: text('lesson_id'),
  status: text('status', { enum: ['not_started', 'in_progress', 'completed', 'skipped'] }).default('not_started'),
  progress: integer('progress').default(0),
  timeSpent: integer('time_spent').default(0),
  lastAccessedAt: integer('last_accessed_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
  score: real('score'),
  attempts: integer('attempts').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date()),
});

export type Enrollment = typeof enrollments.$inferSelect;
export type ProgressTracking = typeof progressTracking.$inferSelect;
