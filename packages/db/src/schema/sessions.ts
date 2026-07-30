import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey().$defaultFn(createId),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  token: text('token').notNull().unique(),
  refreshToken: text('refresh_token').notNull().unique(),
  deviceInfo: text('device_info', { mode: 'json' }).$type<{ type?: string; os?: string; browser?: string }>(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  isMfaVerified: integer('is_mfa_verified', { mode: 'boolean' }).default(false),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  refreshExpiresAt: integer('refresh_expires_at', { mode: 'timestamp' }).notNull(),
  lastActivityAt: integer('last_activity_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  revokedAt: integer('revoked_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export type Session = typeof sessions.$inferSelect;
