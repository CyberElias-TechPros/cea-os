import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';

export const roles = sqliteTable('roles', {
  id: text('id').primaryKey().$defaultFn(createId),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  hierarchy: integer('hierarchy').default(0),
  isSystem: integer('is_system', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date()),
});

export const permissions = sqliteTable('permissions', {
  id: text('id').primaryKey().$defaultFn(createId),
  resource: text('resource').notNull(),
  action: text('action', { enum: ['create', 'read', 'update', 'delete', 'manage', 'approve'] }).notNull(),
  description: text('description'),
  conditions: text('conditions', { mode: 'json' }).$type<Record<string, unknown>[]>(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const rolePermissions = sqliteTable('role_permissions', {
  id: text('id').primaryKey().$defaultFn(createId),
  roleId: text('role_id').notNull().references(() => roles.id, { onDelete: 'cascade' }),
  permissionId: text('permission_id').notNull().references(() => permissions.id, { onDelete: 'cascade' }),
  constraints: text('constraints', { mode: 'json' }).$type<Record<string, unknown>>(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const userRoles = sqliteTable('user_roles', {
  id: text('id').primaryKey().$defaultFn(createId),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  roleId: text('role_id').notNull().references(() => roles.id, { onDelete: 'cascade' }),
  scopeType: text('scope_type', { enum: ['global', 'branch', 'department', 'course', 'project'] }),
  scopeId: text('scope_id'),
  assignedById: text('assigned_by_id').references(() => users.id),
  expiresAt: integer('expires_at', { mode: 'timestamp' }),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export type Role = typeof roles.$inferSelect;
export type Permission = typeof permissions.$inferSelect;
export type UserRole = typeof userRoles.$inferSelect;
