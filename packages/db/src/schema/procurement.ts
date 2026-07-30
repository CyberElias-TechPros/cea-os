import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';
import { inventoryItems } from './inventory';

export const suppliers = sqliteTable('suppliers', {
  id: text('id').primaryKey().$defaultFn(createId),
  name: text('name').notNull(),
  contactPerson: text('contact_person'),
  email: text('email'),
  phone: text('phone'),
  address: text('address'),
  taxId: text('tax_id'),
  paymentTerms: text('payment_terms'),
  notes: text('notes'),
  status: text('status', { enum: ['active', 'inactive', 'blacklisted'] }).default('active'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
  deletedAt: text('deleted_at'),
});

export const purchaseOrders = sqliteTable('purchase_orders', {
  id: text('id').primaryKey().$defaultFn(createId),
  poNumber: text('po_number').notNull().unique(),
  supplierId: text('supplier_id').references(() => suppliers.id, { onDelete: 'set null' }),
  status: text('status', { enum: ['draft', 'sent', 'approved', 'received', 'cancelled'] }).default('draft'),
  totalAmount: real('total_amount'),
  currency: text('currency').default('ZAR'),
  expectedDate: text('expected_date'),
  notes: text('notes'),
  createdById: text('created_by_id').references(() => users.id, { onDelete: 'set null' }),
  approvedById: text('approved_by_id').references(() => users.id, { onDelete: 'set null' }),
  approvedAt: text('approved_at'),
  receivedAt: text('received_at'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
  deletedAt: text('deleted_at'),
});

export const purchaseOrderItems = sqliteTable('purchase_order_items', {
  id: text('id').primaryKey().$defaultFn(createId),
  purchaseOrderId: text('purchase_order_id').notNull().references(() => purchaseOrders.id, { onDelete: 'cascade' }),
  inventoryItemId: text('inventory_item_id').references(() => inventoryItems.id, { onDelete: 'set null' }),
  description: text('description').notNull(),
  quantity: integer('quantity').notNull(),
  unitPrice: real('unit_price').notNull(),
  total: real('total').notNull(),
  received: integer('received').default(0),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export type Supplier = typeof suppliers.$inferSelect;
export type NewSupplier = typeof suppliers.$inferInsert;
export type PurchaseOrder = typeof purchaseOrders.$inferSelect;
export type NewPurchaseOrder = typeof purchaseOrders.$inferInsert;
export type PurchaseOrderItem = typeof purchaseOrderItems.$inferSelect;
