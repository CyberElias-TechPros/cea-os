import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';

export const programs = sqliteTable('programs', {
  id: text('id').primaryKey().$defaultFn(createId),
  departmentId: text('department_id'),
  code: text('code').notNull().unique(),
  name: text('name').notNull(),
  description: text('description'),
  duration: text('duration'),
  credentialType: text('credential_type', { enum: ['certificate', 'diploma', 'degree', 'micro_credential'] }),
  level: text('level', { enum: ['beginner', 'intermediate', 'advanced'] }),
  learningOutcomes: text('learning_outcomes', { mode: 'json' }).$type<string[]>(),
  prerequisites: text('prerequisites', { mode: 'json' }).$type<string[]>(),
  price: real('price'),
  currency: text('currency').default('ZAR'),
  maxStudents: integer('max_students'),
  status: text('status', { enum: ['active', 'inactive', 'draft', 'archived'] }).default('draft'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date()),
});

export const courses = sqliteTable('courses', {
  id: text('id').primaryKey().$defaultFn(createId),
  programId: text('program_id').references(() => programs.id),
  code: text('code').notNull().unique(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  category: text('category'),
  difficulty: text('difficulty', { enum: ['beginner', 'intermediate', 'advanced'] }).default('beginner'),
  durationHours: integer('duration_hours'),
  learningObjectives: text('learning_objectives', { mode: 'json' }).$type<string[]>(),
  syllabus: text('syllabus', { mode: 'json' }).$type<{ title: string; topics: string[] }[]>(),
  price: real('price'),
  currency: text('currency').default('ZAR'),
  isFree: integer('is_free', { mode: 'boolean' }).default(false),
  hasCertificate: integer('has_certificate', { mode: 'boolean' }).default(true),
  passThreshold: integer('pass_threshold').default(60),
  maxStudents: integer('max_students'),
  thumbnailUrl: text('thumbnail_url'),
  status: text('status', { enum: ['active', 'inactive', 'draft', 'archived'] }).default('draft'),
  createdById: text('created_by_id').references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date()),
});

export const courseInstructors = sqliteTable('course_instructors', {
  id: text('id').primaryKey().$defaultFn(createId),
  courseId: text('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: text('role', { enum: ['primary', 'assistant', 'guest'] }).default('primary'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const modules = sqliteTable('modules', {
  id: text('id').primaryKey().$defaultFn(createId),
  courseId: text('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  orderIndex: integer('order_index').notNull(),
  estimatedDuration: integer('estimated_duration'),
  isRequired: integer('is_required', { mode: 'boolean' }).default(true),
  status: text('status', { enum: ['active', 'inactive', 'draft'] }).default('draft'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date()),
});

export const lessons = sqliteTable('lessons', {
  id: text('id').primaryKey().$defaultFn(createId),
  moduleId: text('module_id').notNull().references(() => modules.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  contentType: text('content_type', { enum: ['video', 'article', 'quiz', 'assignment', 'code_lab', 'discussion', 'live_session'] }).default('article'),
  videoUrl: text('video_url'),
  articleBody: text('article_body'),
  embedUrl: text('embed_url'),
  codeLabConfig: text('code_lab_config', { mode: 'json' }).$type<{ language: string; template: string; testCommands: string[] }>(),
  orderIndex: integer('order_index').notNull(),
  estimatedDuration: integer('estimated_duration'),
  isFreePreview: integer('is_free_preview', { mode: 'boolean' }).default(false),
  status: text('status', { enum: ['active', 'inactive', 'draft'] }).default('draft'),
  createdById: text('created_by_id').references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date()),
});

export const lessonMaterials = sqliteTable('lesson_materials', {
  id: text('id').primaryKey().$defaultFn(createId),
  lessonId: text('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  type: text('type', { enum: ['pdf', 'slide', 'code_file', 'image', 'video', 'link', 'other'] }).notNull(),
  title: text('title').notNull(),
  fileUrl: text('file_url'),
  fileSize: integer('file_size'),
  mimeType: text('mime_type'),
  orderIndex: integer('order_index').default(0),
  isRequired: integer('is_required', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export type Program = typeof programs.$inferSelect;
export type Course = typeof courses.$inferSelect;
export type Module = typeof modules.$inferSelect;
export type Lesson = typeof lessons.$inferSelect;
export type LessonMaterial = typeof lessonMaterials.$inferSelect;
