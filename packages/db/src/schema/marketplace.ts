import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';

export const employers = sqliteTable('employers', {
  id: text('id').primaryKey().$defaultFn(createId),
  userId: text('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  companyName: text('company_name').notNull(),
  companySlug: text('company_slug').notNull().unique(),
  companyLogo: text('company_logo'),
  companyWebsite: text('company_website'),
  companySize: text('company_size', { enum: ['1-10', '11-50', '51-200', '201-1000', '1000+'] }),
  industry: text('industry'),
  location: text('location'),
  description: text('description'),
  isVerified: integer('is_verified', { mode: 'boolean' }).default(false),
  status: text('status', { enum: ['active', 'inactive', 'suspended'] }).default('active'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date()),
});

export const jobListings = sqliteTable('job_listings', {
  id: text('id').primaryKey().$defaultFn(createId),
  employerId: text('employer_id').notNull().references(() => employers.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  responsibilities: text('responsibilities', { mode: 'json' }).$type<string[]>(),
  requirements: text('requirements', { mode: 'json' }).$type<string[]>(),
  skillsRequired: text('skills_required', { mode: 'json' }).$type<string[]>(),
  location: text('location'),
  isRemote: integer('is_remote', { mode: 'boolean' }).default(false),
  salaryMin: real('salary_min'),
  salaryMax: real('salary_max'),
  salaryCurrency: text('salary_currency').default('ZAR'),
  employmentType: text('employment_type', { enum: ['full_time', 'part_time', 'contract', 'internship', 'freelance'] }).default('full_time'),
  experienceLevel: text('experience_level', { enum: ['entry', 'mid', 'senior', 'lead'] }).default('entry'),
  applicationsCount: integer('applications_count').default(0),
  status: text('status', { enum: ['draft', 'published', 'closed', 'filled'] }).default('draft'),
  postedAt: integer('posted_at', { mode: 'timestamp' }),
  expiresAt: integer('expires_at', { mode: 'timestamp' }),
  createdById: text('created_by_id').references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date()),
});

export const jobApplications = sqliteTable('job_applications', {
  id: text('id').primaryKey().$defaultFn(createId),
  jobListingId: text('job_listing_id').notNull().references(() => jobListings.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  coverLetter: text('cover_letter'),
  resumeUrl: text('resume_url'),
  portfolioUrl: text('portfolio_url'),
  status: text('status', { enum: ['submitted', 'reviewing', 'shortlisted', 'interviewed', 'offered', 'hired', 'rejected', 'withdrawn'] }).default('submitted'),
  matchScore: real('match_score'),
  notes: text('notes'),
  appliedAt: integer('applied_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date()),
});

export const jobInterviews = sqliteTable('job_interviews', {
  id: text('id').primaryKey().$defaultFn(createId),
  applicationId: text('application_id').notNull().references(() => jobApplications.id, { onDelete: 'cascade' }),
  type: text('type', { enum: ['phone', 'video', 'in_person', 'technical', 'panel'] }).default('video'),
  scheduledAt: integer('scheduled_at', { mode: 'timestamp' }).notNull(),
  duration: integer('duration'),
  meetingLink: text('meeting_link'),
  location: text('location'),
  status: text('status', { enum: ['scheduled', 'completed', 'cancelled', 'rescheduled'] }).default('scheduled'),
  feedback: text('feedback'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date()),
});

export const freelanceGigs = sqliteTable('freelance_gigs', {
  id: text('id').primaryKey().$defaultFn(createId),
  employerId: text('employer_id').notNull().references(() => employers.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  skillsRequired: text('skills_required', { mode: 'json' }).$type<string[]>(),
  budget: real('budget'),
  budgetCurrency: text('budget_currency').default('ZAR'),
  duration: text('duration'),
  isRemote: integer('is_remote', { mode: 'boolean' }).default(true),
  status: text('status', { enum: ['open', 'in_progress', 'completed', 'cancelled'] }).default('open'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date()),
});

export const gigApplications = sqliteTable('gig_applications', {
  id: text('id').primaryKey().$defaultFn(createId),
  gigId: text('gig_id').notNull().references(() => freelanceGigs.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  proposal: text('proposal'),
  bidAmount: real('bid_amount'),
  status: text('status', { enum: ['submitted', 'accepted', 'rejected', 'withdrawn'] }).default('submitted'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export type Employer = typeof employers.$inferSelect;
export type JobListing = typeof jobListings.$inferSelect;
export type JobApplication = typeof jobApplications.$inferSelect;
export type JobInterview = typeof jobInterviews.$inferSelect;
export type FreelanceGig = typeof freelanceGigs.$inferSelect;
export type GigApplication = typeof gigApplications.$inferSelect;
