import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';
import { courses } from './learning';
import { enrollments } from './enrollments';

export const certificates = sqliteTable('certificates', {
  id: text('id').primaryKey().$defaultFn(createId),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  courseId: text('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  enrollmentId: text('enrollment_id').notNull().references(() => enrollments.id, { onDelete: 'cascade' }),
  certificateNumber: text('certificate_number').notNull().unique(),
  verificationCode: text('verification_code').notNull().unique(),
  template: text('template'),
  issuedAt: integer('issued_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  expiresAt: integer('expires_at', { mode: 'timestamp' }),
  isVerified: integer('is_verified', { mode: 'boolean' }).default(true),
  metadata: text('metadata', { mode: 'json' }).$type<{ finalGrade?: number; honors?: boolean; duration?: string }>(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export type Certificate = typeof certificates.$inferSelect;
