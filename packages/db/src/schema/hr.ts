import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';

export const departments = sqliteTable('departments', {
  id: text('id').primaryKey().$defaultFn(createId),
  name: text('name').notNull().unique(),
  code: text('code').notNull().unique(),
  description: text('description'),
  headId: text('head_id').references(() => users.id, { onDelete: 'set null' }),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const branches = sqliteTable('branches', {
  id: text('id').primaryKey().$defaultFn(createId),
  name: text('name').notNull().unique(),
  code: text('code').notNull().unique(),
  address: text('address'),
  phone: text('phone'),
  email: text('email'),
  managerId: text('manager_id').references(() => users.id, { onDelete: 'set null' }),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const employees = sqliteTable('employees', {
  id: text('id').primaryKey().$defaultFn(createId),
  userId: text('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  employeeCode: text('employee_code').notNull().unique(),
  departmentId: text('department_id').references(() => departments.id, { onDelete: 'set null' }),
  branchId: text('branch_id').references(() => branches.id, { onDelete: 'set null' }),
  position: text('position'),
  employmentType: text('employment_type', { enum: ['full_time', 'part_time', 'contract', 'intern', 'temporary'] }).default('full_time'),
  status: text('status', { enum: ['active', 'on_leave', 'terminated', 'resigned'] }).default('active'),
  startDate: text('start_date'),
  endDate: text('end_date'),
  salary: real('salary'),
  salaryCurrency: text('salary_currency').default('ZAR'),
  emergencyContact: text('emergency_contact'),
  emergencyPhone: text('emergency_phone'),
  notes: text('notes'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
  deletedAt: text('deleted_at'),
});

export const leaveRequests = sqliteTable('leave_requests', {
  id: text('id').primaryKey().$defaultFn(createId),
  employeeId: text('employee_id').notNull().references(() => employees.id, { onDelete: 'cascade' }),
  type: text('type', { enum: ['annual', 'sick', 'personal', 'maternity', 'paternity', 'study', 'unpaid'] }).notNull(),
  startDate: text('start_date').notNull(),
  endDate: text('end_date').notNull(),
  days: integer('days').notNull(),
  reason: text('reason'),
  status: text('status', { enum: ['pending', 'approved', 'rejected', 'cancelled'] }).default('pending'),
  approvedById: text('approved_by_id').references(() => users.id, { onDelete: 'set null' }),
  approvedAt: text('approved_at'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const staffAttendance = sqliteTable('staff_attendance', {
  id: text('id').primaryKey().$defaultFn(createId),
  employeeId: text('employee_id').notNull().references(() => employees.id, { onDelete: 'cascade' }),
  date: text('date').notNull(),
  clockIn: text('clock_in'),
  clockOut: text('clock_out'),
  status: text('status', { enum: ['present', 'late', 'absent', 'half_day', 'on_leave'] }).default('present'),
  notes: text('notes'),
  markedById: text('marked_by_id').references(() => users.id, { onDelete: 'set null' }),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const performanceReviews = sqliteTable('performance_reviews', {
  id: text('id').primaryKey().$defaultFn(createId),
  employeeId: text('employee_id').notNull().references(() => employees.id, { onDelete: 'cascade' }),
  reviewerId: text('reviewer_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  period: text('period').notNull(),
  rating: integer('rating'),
  strengths: text('strengths'),
  improvements: text('improvements'),
  goals: text('goals'),
  status: text('status', { enum: ['draft', 'submitted', 'acknowledged', 'completed'] }).default('draft'),
  submittedAt: text('submitted_at'),
  completedAt: text('completed_at'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export type Employee = typeof employees.$inferSelect;
export type NewEmployee = typeof employees.$inferInsert;
export type LeaveRequest = typeof leaveRequests.$inferSelect;
export type Department = typeof departments.$inferSelect;
export type Branch = typeof branches.$inferSelect;
export type StaffAttendance = typeof staffAttendance.$inferSelect;
export type PerformanceReview = typeof performanceReviews.$inferSelect;
