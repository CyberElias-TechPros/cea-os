import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';

export const conversations = sqliteTable('conversations', {
  id: text('id').primaryKey().$defaultFn(createId),
  type: text('type', { enum: ['direct', 'group', 'course', 'support'] }).default('direct'),
  title: text('title'),
  courseId: text('course_id'),
  createdById: text('created_by_id').references(() => users.id),
  lastMessageAt: integer('last_message_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const conversationParticipants = sqliteTable('conversation_participants', {
  id: text('id').primaryKey().$defaultFn(createId),
  conversationId: text('conversation_id').notNull().references(() => conversations.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  lastReadAt: integer('last_read_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  isMuted: integer('is_muted', { mode: 'boolean' }).default(false),
  joinedAt: integer('joined_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const messages = sqliteTable('messages', {
  id: text('id').primaryKey().$defaultFn(createId),
  conversationId: text('conversation_id').notNull().references(() => conversations.id, { onDelete: 'cascade' }),
  senderId: text('sender_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  messageType: text('message_type', { enum: ['text', 'image', 'file', 'system'] }).default('text'),
  fileUrl: text('file_url'),
  replyToId: text('reply_to_id'),
  editedAt: integer('edited_at', { mode: 'timestamp' }),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export type Conversation = typeof conversations.$inferSelect;
export type Message = typeof messages.$inferSelect;
