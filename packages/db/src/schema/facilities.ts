import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';

export const rooms = sqliteTable('rooms', {
  id: text('id').primaryKey().$defaultFn(createId),
  name: text('name').notNull(),
  code: text('code').notNull().unique(),
  type: text('type', { enum: ['classroom', 'lab', 'meeting', 'event_hall', 'study', 'other'] }).default('classroom'),
  capacity: integer('capacity').default(1),
  location: text('location'),
  amenities: text('amenities', { mode: 'json' }).$type<string[]>(),
  status: text('status', { enum: ['available', 'maintenance', 'closed'] }).default('available'),
  notes: text('notes'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const roomBookings = sqliteTable('room_bookings', {
  id: text('id').primaryKey().$defaultFn(createId),
  roomId: text('room_id').notNull().references(() => rooms.id, { onDelete: 'cascade' }),
  bookerId: text('booker_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  purpose: text('purpose'),
  startTime: text('start_time').notNull(),
  endTime: text('end_time').notNull(),
  status: text('status', { enum: ['pending', 'approved', 'declined', 'cancelled', 'completed'] }).default('pending'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const workOrders = sqliteTable('work_orders', {
  id: text('id').primaryKey().$defaultFn(createId),
  title: text('title').notNull(),
  description: text('description'),
  category: text('category', { enum: ['plumbing', 'electrical', 'it', 'cleaning', 'furniture', 'other'] }).default('other'),
  priority: text('priority', { enum: ['low', 'medium', 'high', 'urgent'] }).default('medium'),
  status: text('status', { enum: ['open', 'in_progress', 'on_hold', 'resolved', 'closed'] }).default('open'),
  location: text('location'),
  reportedById: text('reported_by_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  assignedToId: text('assigned_to_id').references(() => users.id, { onDelete: 'set null' }),
  dueDate: text('due_date'),
  resolvedAt: text('resolved_at'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export type Room = typeof rooms.$inferSelect;
export type NewRoom = typeof rooms.$inferInsert;
export type RoomBooking = typeof roomBookings.$inferSelect;
export type NewRoomBooking = typeof roomBookings.$inferInsert;
export type WorkOrder = typeof workOrders.$inferSelect;
export type NewWorkOrder = typeof workOrders.$inferInsert;
