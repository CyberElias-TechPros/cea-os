import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';
import { employers } from './marketplace';

export const alumniProfiles = sqliteTable('alumni_profiles', {
  id: text('id').primaryKey().$defaultFn(createId),
  userId: text('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  currentEmployer: text('current_employer'),
  currentPosition: text('current_position'),
  industry: text('industry'),
  graduationYear: integer('graduation_year'),
  linkedinUrl: text('linkedin_url'),
  githubUrl: text('github_url'),
  isMentor: integer('is_mentor', { mode: 'boolean' }).default(false),
  mentorshipAreas: text('mentorship_areas', { mode: 'json' }).$type<string[]>(),
  isVisible: integer('is_visible', { mode: 'boolean' }).default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date()),
});

export const placements = sqliteTable('placements', {
  id: text('id').primaryKey().$defaultFn(createId),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  employerId: text('employer_id').references(() => employers.id),
  position: text('position').notNull(),
  placementDate: integer('placement_date', { mode: 'timestamp' }).notNull(),
  salary: text('salary'),
  type: text('type', { enum: ['job', 'internship', 'freelance'] }).default('job'),
  notes: text('notes'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export type AlumniProfile = typeof alumniProfiles.$inferSelect;
export type Placement = typeof placements.$inferSelect;
