import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';
import { contacts } from './crm';
import { contracts } from './contracts';

export const invoices = sqliteTable('invoices', {
  id: text('id').primaryKey().$defaultFn(createId),
  invoiceNumber: text('invoice_number').notNull(),
  clientId: text('client_id').references(() => contacts.id, { onDelete: 'set null' }),
  contractId: text('contract_id').references(() => contracts.id, { onDelete: 'set null' }),
  status: text('status', { enum: ['draft', 'sent', 'viewed', 'overdue', 'paid', 'cancelled', 'refunded'] }).default('draft'),
  subtotal: real('subtotal').notNull(),
  taxRate: real('tax_rate').default(0),
  taxAmount: real('tax_amount').default(0),
  discount: real('discount').default(0),
  total: real('total').notNull(),
  currency: text('currency').default('ZAR'),
  dueDate: text('due_date'),
  paidAt: text('paid_at'),
  paymentMethod: text('payment_method'),
  paymentReference: text('payment_reference'),
  notes: text('notes'),
  createdById: text('created_by_id').references(() => users.id, { onDelete: 'set null' }),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
  deletedAt: text('deleted_at'),
});

export const invoiceLineItems = sqliteTable('invoice_line_items', {
  id: text('id').primaryKey().$defaultFn(createId),
  invoiceId: text('invoice_id').notNull().references(() => invoices.id, { onDelete: 'cascade' }),
  description: text('description').notNull(),
  quantity: real('quantity').default(1),
  unitPrice: real('unit_price').notNull(),
  total: real('total').notNull(),
  type: text('type', { enum: ['tuition', 'service', 'product', 'fee', 'other'] }).default('service'),
});

export type Invoice = typeof invoices.$inferSelect;
export type NewInvoice = typeof invoices.$inferInsert;
export type InvoiceLineItem = typeof invoiceLineItems.$inferSelect;
export type NewInvoiceLineItem = typeof invoiceLineItems.$inferInsert;
