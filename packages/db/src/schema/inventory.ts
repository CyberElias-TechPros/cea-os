import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';

export const inventoryItems = sqliteTable('inventory_items', {
  id: text('id').primaryKey().$defaultFn(createId),
  sku: text('sku').notNull().unique(),
  name: text('name').notNull(),
  description: text('description'),
  category: text('category', { enum: ['equipment', 'supplies', 'furniture', 'electronics', 'books', 'other'] }).default('other'),
  quantity: integer('quantity').notNull().default(0),
  minQuantity: integer('min_quantity').default(0),
  unitPrice: real('unit_price'),
  currency: text('currency').default('ZAR'),
  location: text('location'),
  notes: text('notes'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
  deletedAt: text('deleted_at'),
});

export const assetTracking = sqliteTable('asset_tracking', {
  id: text('id').primaryKey().$defaultFn(createId),
  inventoryItemId: text('inventory_item_id').notNull().references(() => inventoryItems.id, { onDelete: 'cascade' }),
  assetTag: text('asset_tag').notNull().unique(),
  assignedToId: text('assigned_to_id').references(() => users.id, { onDelete: 'set null' }),
  status: text('status', { enum: ['available', 'assigned', 'maintenance', 'lost', 'disposed'] }).default('available'),
  purchaseDate: text('purchase_date'),
  purchasePrice: real('purchase_price'),
  warrantyExpiry: text('warranty_expiry'),
  notes: text('notes'),
  checkedOutAt: text('checked_out_at'),
  returnedAt: text('returned_at'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const stockMovements = sqliteTable('stock_movements', {
  id: text('id').primaryKey().$defaultFn(createId),
  inventoryItemId: text('inventory_item_id').notNull().references(() => inventoryItems.id, { onDelete: 'cascade' }),
  type: text('type', { enum: ['in', 'out', 'adjustment', 'return'] }).notNull(),
  quantity: integer('quantity').notNull(),
  reference: text('reference'),
  notes: text('notes'),
  recordedById: text('recorded_by_id').references(() => users.id, { onDelete: 'set null' }),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export type InventoryItem = typeof inventoryItems.$inferSelect;
export type AssetTrack = typeof assetTracking.$inferSelect;
export type StockMovement = typeof stockMovements.$inferSelect;
