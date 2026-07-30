import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';

export const visitorLogs = sqliteTable('visitor_logs', {
  id: text('id').primaryKey().$defaultFn(createId),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  idType: text('id_type', { enum: ['national_id', 'passport', 'drivers_license', 'other'] }),
  idNumber: text('id_number'),
  organization: text('organization'),
  purpose: text('purpose', { enum: ['visit', 'enrollment_inquiry', 'delivery', 'interview', 'meeting', 'event', 'other'] }).notNull(),
  hostUserId: text('host_user_id'),
  hostName: text('host_name'),
  notes: text('notes'),
  status: text('status', { enum: ['pending', 'checked_in', 'checked_out', 'cancelled'] }).default('pending'),
  checkedInAt: integer('checked_in_at', { mode: 'timestamp' }),
  checkedOutAt: integer('checked_out_at', { mode: 'timestamp' }),
  qrCode: text('qr_code'),
  badgePrinted: integer('badge_printed', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date()),
});

export type VisitorLog = typeof visitorLogs.$inferSelect;
export type NewVisitorLog = typeof visitorLogs.$inferInsert;
