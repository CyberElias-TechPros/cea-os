import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';

export const portfolios = sqliteTable('portfolios', {
  id: text('id').primaryKey().$defaultFn(createId),
  userId: text('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  headline: text('headline'),
  bio: text('bio'),
  skills: text('skills', { mode: 'json' }).$type<string[]>(),
  experience: text('experience', { mode: 'json' }).$type<{ title: string; company: string; startDate: string; endDate?: string; description: string }[]>(),
  education: text('education', { mode: 'json' }).$type<{ degree: string; institution: string; year: number }[]>(),
  certifications: text('certifications', { mode: 'json' }).$type<{ name: string; issuer: string; year: number }[]>(),
  socialLinks: text('social_links', { mode: 'json' }).$type<Record<string, string>>(),
  resumeUrl: text('resume_url'),
  isPublic: integer('is_public', { mode: 'boolean' }).default(false),
  views: integer('views').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date()),
});

export const portfolioProjects = sqliteTable('portfolio_projects', {
  id: text('id').primaryKey().$defaultFn(createId),
  portfolioId: text('portfolio_id').notNull().references(() => portfolios.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  technologies: text('technologies', { mode: 'json' }).$type<string[]>(),
  imageUrl: text('image_url'),
  liveUrl: text('live_url'),
  repoUrl: text('repo_url'),
  startDate: integer('start_date', { mode: 'timestamp' }),
  endDate: integer('end_date', { mode: 'timestamp' }),
  isFeatured: integer('is_featured', { mode: 'boolean' }).default(false),
  orderIndex: integer('order_index').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date()),
});

export type Portfolio = typeof portfolios.$inferSelect;
export type PortfolioProject = typeof portfolioProjects.$inferSelect;
