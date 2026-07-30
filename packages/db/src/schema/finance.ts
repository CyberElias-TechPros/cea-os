import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';

export const chartOfAccounts = sqliteTable('chart_of_accounts', {
  id: text('id').primaryKey().$defaultFn(createId),
  code: text('code').notNull().unique(),
  name: text('name').notNull(),
  type: text('type', { enum: ['asset', 'liability', 'equity', 'revenue', 'expense'] }).notNull(),
  description: text('description'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const transactions = sqliteTable('transactions', {
  id: text('id').primaryKey().$defaultFn(createId),
  accountId: text('account_id').notNull().references(() => chartOfAccounts.id, { onDelete: 'restrict' }),
  type: text('type', { enum: ['debit', 'credit'] }).notNull(),
  amount: real('amount').notNull(),
  currency: text('currency').default('ZAR'),
  description: text('description'),
  reference: text('reference'),
  category: text('category', { enum: ['tuition', 'salary', 'utilities', 'supplies', 'services', 'other'] }).default('other'),
  recordedById: text('recorded_by_id').references(() => users.id, { onDelete: 'set null' }),
  transactionDate: text('transaction_date').notNull(),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const expenseClaims = sqliteTable('expense_claims', {
  id: text('id').primaryKey().$defaultFn(createId),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  amount: real('amount').notNull(),
  currency: text('currency').default('ZAR'),
  category: text('category', { enum: ['travel', 'meals', 'supplies', 'equipment', 'utilities', 'other'] }).default('other'),
  description: text('description'),
  receiptUrl: text('receipt_url'),
  status: text('status', { enum: ['pending', 'approved', 'rejected', 'paid'] }).default('pending'),
  approvedById: text('approved_by_id').references(() => users.id, { onDelete: 'set null' }),
  approvedAt: text('approved_at'),
  paidAt: text('paid_at'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const budgets = sqliteTable('budgets', {
  id: text('id').primaryKey().$defaultFn(createId),
  name: text('name').notNull(),
  fiscalYear: text('fiscal_year').notNull(),
  amount: real('amount').notNull(),
  spent: real('spent').default(0),
  department: text('department'),
  notes: text('notes'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;
export type ExpenseClaim = typeof expenseClaims.$inferSelect;
export type NewExpenseClaim = typeof expenseClaims.$inferInsert;
export type Budget = typeof budgets.$inferSelect;
export type Account = typeof chartOfAccounts.$inferSelect;
