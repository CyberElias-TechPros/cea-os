import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';
import { enrollments } from './enrollments';

export const attendanceRecords = sqliteTable('attendance_records', {
  id: text('id').primaryKey().$defaultFn(createId),
  enrollmentId: text('enrollment_id').notNull().references(() => enrollments.id, { onDelete: 'cascade' }),
  sessionDate: integer('session_date', { mode: 'timestamp' }).notNull(),
  status: text('status', { enum: ['present', 'absent', 'late', 'excused', 'holiday'] }).notNull(),
  checkInTime: integer('check_in_time', { mode: 'timestamp' }),
  checkOutTime: integer('check_out_time', { mode: 'timestamp' }),
  checkInMethod: text('check_in_method', { enum: ['qr', 'manual', 'geo', 'face'] }).default('manual'),
  checkInLatitude: real('check_in_latitude'),
  checkInLongitude: real('check_in_longitude'),
  lateMinutes: integer('late_minutes'),
  markedById: text('marked_by_id').references(() => users.id),
  reason: text('reason'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date()),
});

export type AttendanceRecord = typeof attendanceRecords.$inferSelect;
