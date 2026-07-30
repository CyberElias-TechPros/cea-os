import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';

export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(createId),
  email: text('email').notNull().unique(),
  emailVerified: integer('email_verified', { mode: 'boolean' }).default(false),
  passwordHash: text('password_hash'),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  avatarUrl: text('avatar_url'),
  phone: text('phone'),
  phoneCountryCode: text('phone_country_code').default('+27'),
  phoneVerified: integer('phone_verified', { mode: 'boolean' }).default(false),
  twoFactorEnabled: integer('two_factor_enabled', { mode: 'boolean' }).default(false),
  twoFactorSecret: text('two_factor_secret'),
  status: text('status', { enum: ['active', 'inactive', 'suspended', 'locked'] }).default('active'),
  lastLoginAt: integer('last_login_at', { mode: 'timestamp' }),
  lastLoginIp: text('last_login_ip'),
  loginAttempts: integer('login_attempts').default(0),
  lockoutUntil: integer('lockout_until', { mode: 'timestamp' }),
  preferences: text('preferences', { mode: 'json' }).$type<{
    theme?: 'light' | 'dark' | 'system';
    language?: string;
    timezone?: string;
    notifications?: Record<string, boolean>;
  }>(),
  metadata: text('metadata', { mode: 'json' }).$type<Record<string, unknown>>(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date()),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
