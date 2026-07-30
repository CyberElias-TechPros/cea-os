import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';

export const forumCategories = sqliteTable('forum_categories', {
  id: text('id').primaryKey().$defaultFn(createId),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  orderIndex: integer('order_index').default(0),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const forumThreads = sqliteTable('forum_threads', {
  id: text('id').primaryKey().$defaultFn(createId),
  categoryId: text('category_id').notNull().references(() => forumCategories.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  content: text('content').notNull(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  isPinned: integer('is_pinned', { mode: 'boolean' }).default(false),
  isLocked: integer('is_locked', { mode: 'boolean' }).default(false),
  viewCount: integer('view_count').default(0),
  replyCount: integer('reply_count').default(0),
  lastActivityAt: text('last_activity_at'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
  deletedAt: text('deleted_at'),
});

export const forumPosts = sqliteTable('forum_posts', {
  id: text('id').primaryKey().$defaultFn(createId),
  threadId: text('thread_id').notNull().references(() => forumThreads.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  isSolution: integer('is_solution', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const forumLikes = sqliteTable('forum_likes', {
  id: text('id').primaryKey().$defaultFn(createId),
  postId: text('post_id').notNull().references(() => forumPosts.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const groups = sqliteTable('groups', {
  id: text('id').primaryKey().$defaultFn(createId),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  coverImageUrl: text('cover_image_url'),
  type: text('type', { enum: ['study', 'project', 'social', 'alumni', 'professional', 'other'] }).default('study'),
  visibility: text('visibility', { enum: ['public', 'private', 'invite_only'] }).default('public'),
  ownerId: text('owner_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  memberCount: integer('member_count').default(1),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
  deletedAt: text('deleted_at'),
});

export const groupMembers = sqliteTable('group_members', {
  id: text('id').primaryKey().$defaultFn(createId),
  groupId: text('group_id').notNull().references(() => groups.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: text('role', { enum: ['owner', 'admin', 'moderator', 'member'] }).default('member'),
  joinedAt: text('joined_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const events = sqliteTable('events', {
  id: text('id').primaryKey().$defaultFn(createId),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  type: text('type', { enum: ['workshop', 'webinar', 'networking', 'social', 'academic', 'career_fair', 'other'] }).default('workshop'),
  format: text('format', { enum: ['in_person', 'virtual', 'hybrid'] }).default('virtual'),
  startDate: text('start_date').notNull(),
  endDate: text('end_date'),
  location: text('location'),
  virtualLink: text('virtual_link'),
  coverImageUrl: text('cover_image_url'),
  maxAttendees: integer('max_attendees'),
  organizerId: text('organizer_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  status: text('status', { enum: ['draft', 'published', 'cancelled', 'completed'] }).default('draft'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
  deletedAt: text('deleted_at'),
});

export const eventRegistrations = sqliteTable('event_registrations', {
  id: text('id').primaryKey().$defaultFn(createId),
  eventId: text('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  status: text('status', { enum: ['registered', 'attended', 'cancelled', 'no_show'] }).default('registered'),
  checkedInAt: text('checked_in_at'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const scholarships = sqliteTable('scholarships', {
  id: text('id').primaryKey().$defaultFn(createId),
  name: text('name').notNull(),
  description: text('description'),
  fundAmount: real('fund_amount'),
  currency: text('currency').default('ZAR'),
  availableSlots: integer('available_slots').default(1),
  deadline: text('deadline'),
  eligibilityCriteria: text('eligibility_criteria'),
  status: text('status', { enum: ['active', 'closed', 'cancelled'] }).default('active'),
  createdById: text('created_by_id').references(() => users.id, { onDelete: 'set null' }),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const scholarshipApplications = sqliteTable('scholarship_applications', {
  id: text('id').primaryKey().$defaultFn(createId),
  scholarshipId: text('scholarship_id').notNull().references(() => scholarships.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  motivation: text('motivation'),
  status: text('status', { enum: ['pending', 'approved', 'rejected', 'awarded'] }).default('pending'),
  reviewedById: text('reviewed_by_id').references(() => users.id, { onDelete: 'set null' }),
  reviewedAt: text('reviewed_at'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const mentorshipRelations = sqliteTable('mentorship_relations', {
  id: text('id').primaryKey().$defaultFn(createId),
  mentorId: text('mentor_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  menteeId: text('mentee_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  focusArea: text('focus_area'),
  status: text('status', { enum: ['pending', 'active', 'completed', 'cancelled'] }).default('pending'),
  startDate: text('start_date'),
  endDate: text('end_date'),
  notes: text('notes'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const partnerships = sqliteTable('partnerships', {
  id: text('id').primaryKey().$defaultFn(createId),
  organizationName: text('organization_name').notNull(),
  contactPerson: text('contact_person'),
  email: text('email'),
  phone: text('phone'),
  type: text('type', { enum: ['educational', 'corporate', 'government', 'ngo', 'other'] }).default('educational'),
  status: text('status', { enum: ['lead', 'negotiation', 'active', 'completed', 'expired'] }).default('lead'),
  mouUrl: text('mou_url'),
  startDate: text('start_date'),
  endDate: text('end_date'),
  notes: text('notes'),
  createdById: text('created_by_id').references(() => users.id, { onDelete: 'set null' }),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
  deletedAt: text('deleted_at'),
});

export const volunteerOpportunities = sqliteTable('volunteer_opportunities', {
  id: text('id').primaryKey().$defaultFn(createId),
  title: text('title').notNull(),
  description: text('description'),
  location: text('location'),
  skills: text('skills'),
  commitment: text('commitment'),
  slots: integer('slots').default(1),
  status: text('status', { enum: ['open', 'filled', 'cancelled'] }).default('open'),
  createdById: text('created_by_id').references(() => users.id, { onDelete: 'set null' }),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const volunteerSignups = sqliteTable('volunteer_signups', {
  id: text('id').primaryKey().$defaultFn(createId),
  opportunityId: text('opportunity_id').notNull().references(() => volunteerOpportunities.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  status: text('status', { enum: ['pending', 'approved', 'completed', 'cancelled'] }).default('pending'),
  hoursLogged: real('hours_logged').default(0),
  feedback: text('feedback'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export const donations = sqliteTable('donations', {
  id: text('id').primaryKey().$defaultFn(createId),
  donorName: text('donor_name'),
  donorEmail: text('donor_email'),
  amount: real('amount').notNull(),
  currency: text('currency').default('ZAR'),
  message: text('message'),
  isAnonymous: integer('is_anonymous', { mode: 'boolean' }).default(false),
  paymentReference: text('payment_reference'),
  status: text('status', { enum: ['pending', 'completed', 'failed'] }).default('pending'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});

export type ForumCategory = typeof forumCategories.$inferSelect;
export type ForumThread = typeof forumThreads.$inferSelect;
export type ForumPost = typeof forumPosts.$inferSelect;
export type Group = typeof groups.$inferSelect;
export type GroupMember = typeof groupMembers.$inferSelect;
export type Event = typeof events.$inferSelect;
export type EventRegistration = typeof eventRegistrations.$inferSelect;
export type Scholarship = typeof scholarships.$inferSelect;
export type ScholarshipApplication = typeof scholarshipApplications.$inferSelect;
export type MentorshipRelation = typeof mentorshipRelations.$inferSelect;
export type Partnership = typeof partnerships.$inferSelect;
export type VolunteerOpportunity = typeof volunteerOpportunities.$inferSelect;
export type VolunteerSignup = typeof volunteerSignups.$inferSelect;
export type Donation = typeof donations.$inferSelect;
