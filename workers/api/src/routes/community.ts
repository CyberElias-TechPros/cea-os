import { Hono } from 'hono';
import { getDb, contacts, forumCategories, forumThreads, forumPosts, forumLikes, groups, groupMembers, events, eventRegistrations, scholarships, scholarshipApplications, mentorshipRelations, partnerships, volunteerOpportunities, volunteerSignups, donations, newsletterSubscribers } from '@cea/db';
import { eq, and, desc, asc } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware, requirePermission } from '../middleware/auth';

export const communityRouter = new Hono<Env>();

// --- Newsletter (public lead capture) ---
communityRouter.post('/newsletter', async (c) => {
  const db = getDb(c.env.DB);
  const { firstName, lastName, email } = await c.req.json<{ firstName?: string; lastName?: string; email: string }>();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return c.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'A valid email is required' } }, 422);
  }
  const existing = await db.select().from(contacts).where(eq(contacts.email, email)).limit(1);
  if (existing.length > 0) {
    const subExists = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email)).limit(1);
    if (subExists.length === 0) {
      await db.insert(newsletterSubscribers).values({ email, firstName, source: 'community' });
    }
    return c.json({ success: true, data: { message: 'Already subscribed' } });
  }
  const [contact] = await db.insert(contacts).values({
    firstName: firstName?.trim() || 'Newsletter',
    lastName: lastName?.trim() || 'Subscriber',
    email: email.trim(),
    source: 'website',
    status: 'lead',
    type: 'prospective_student',
    notes: 'Newsletter signup',
  }).returning();
  const subExists = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email.trim())).limit(1);
  if (subExists.length === 0) {
    await db.insert(newsletterSubscribers).values({ email: email.trim(), firstName, source: 'footer' });
  }
  return c.json({ success: true, data: { id: contact!.id, message: 'Subscribed' } }, 201);
});

// --- Forums ---
communityRouter.get('/forums/categories', async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(forumCategories).orderBy(asc(forumCategories.orderIndex));
  return c.json({ success: true, data: items });
});

communityRouter.post('/forums/categories', authMiddleware, requirePermission('community', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const [cat] = await db.insert(forumCategories).values({ ...body, slug }).returning();
  return c.json({ success: true, data: cat }, 201);
});

communityRouter.get('/forums/threads', async (c) => {
  const db = getDb(c.env.DB);
  const { categoryId } = c.req.query();
  const conditions: any[] = [sql`deleted_at IS NULL`];
  if (categoryId) conditions.push(eq(forumThreads.categoryId, categoryId));
  const items = await db.select().from(forumThreads).where(and(...conditions)).orderBy(desc(forumThreads.isPinned), desc(forumThreads.lastActivityAt));
  return c.json({ success: true, data: items });
});

communityRouter.get('/forums/threads/:id', async (c) => {
  const db = getDb(c.env.DB);
  const [thread] = await db.select().from(forumThreads).where(eq(forumThreads.id, c.req.param('id'))).limit(1);
  if (!thread) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Thread not found' } }, 404);
  await db.update(forumThreads).set({ viewCount: sql`view_count + 1` }).where(eq(forumThreads.id, thread.id));
  const posts = await db.select().from(forumPosts).where(eq(forumPosts.threadId, thread.id)).orderBy(asc(forumPosts.createdAt));
  return c.json({ success: true, data: { ...thread, posts } });
});

communityRouter.post('/forums/threads', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();
  const title = body.title;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString(36);
  const [thread] = await db.insert(forumThreads).values({ ...body, userId, slug, lastActivityAt: new Date().toISOString() }).returning();
  return c.json({ success: true, data: thread }, 201);
});

communityRouter.post('/forums/threads/:id/posts', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();
  const [post] = await db.insert(forumPosts).values({ threadId: c.req.param('id'), userId, ...body }).returning();
  await db.update(forumThreads).set({ replyCount: sql`reply_count + 1`, lastActivityAt: new Date().toISOString() }).where(eq(forumThreads.id, c.req.param('id')));
  return c.json({ success: true, data: post }, 201);
});

communityRouter.post('/forums/posts/:id/like', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const existing = await db.select().from(forumLikes).where(and(eq(forumLikes.postId, c.req.param('id')), eq(forumLikes.userId, userId))).limit(1);
  if (existing.length > 0) {
    await db.delete(forumLikes).where(eq(forumLikes.id, existing[0]!.id));
    return c.json({ success: true, data: { liked: false } });
  }
  await db.insert(forumLikes).values({ postId: c.req.param('id'), userId });
  return c.json({ success: true, data: { liked: true } }, 201);
});

// --- Groups ---
communityRouter.get('/groups', async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(groups).where(and(sql`deleted_at IS NULL`, eq(groups.visibility, 'public'))).orderBy(desc(groups.memberCount));
  return c.json({ success: true, data: items });
});

communityRouter.get('/groups/my', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const membership = await db.select({ groupId: groupMembers.groupId }).from(groupMembers).where(eq(groupMembers.userId, userId));
  const ids = membership.map(m => m.groupId);
  if (ids.length === 0) return c.json({ success: true, data: [] });
  const items = await db.select().from(groups).where(sql`id IN (${ids.join(',')})`);
  return c.json({ success: true, data: items });
});

communityRouter.post('/groups', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();
  const slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString(36);
  const [group] = await db.insert(groups).values({ ...body, slug, ownerId: userId }).returning();
  await db.insert(groupMembers).values({ groupId: group!.id, userId, role: 'owner' });
  return c.json({ success: true, data: group }, 201);
});

communityRouter.post('/groups/:id/join', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const existing = await db.select().from(groupMembers).where(and(eq(groupMembers.groupId, c.req.param('id')), eq(groupMembers.userId, userId))).limit(1);
  if (existing.length > 0) return c.json({ success: false, error: { code: 'CONFLICT', message: 'Already a member' } }, 409);
  await db.insert(groupMembers).values({ groupId: c.req.param('id'), userId });
  await db.update(groups).set({ memberCount: sql`member_count + 1` }).where(eq(groups.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Joined group' } }, 201);
});

// --- Events ---
communityRouter.get('/events', async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(events).where(and(sql`deleted_at IS NULL`, eq(events.status, 'published'))).orderBy(asc(events.startDate));
  return c.json({ success: true, data: items });
});

communityRouter.post('/events', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();
  const slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString(36);
  const [event] = await db.insert(events).values({ ...body, slug, organizerId: userId }).returning();
  return c.json({ success: true, data: event }, 201);
});

communityRouter.post('/events/:id/register', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const [reg] = await db.insert(eventRegistrations).values({ eventId: c.req.param('id'), userId }).returning();
  return c.json({ success: true, data: reg }, 201);
});

communityRouter.get('/events/registered', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const items = await db.select({ eventId: eventRegistrations.eventId, status: eventRegistrations.status }).from(eventRegistrations).where(eq(eventRegistrations.userId, userId));
  return c.json({ success: true, data: items });
});

communityRouter.post('/events/:id/checkin', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  await db.update(eventRegistrations).set({ status: 'attended', checkedInAt: new Date().toISOString() }).where(and(eq(eventRegistrations.eventId, c.req.param('id')), eq(eventRegistrations.userId, userId)));
  return c.json({ success: true, data: { message: 'Checked in' } });
});

// --- Scholarships ---
communityRouter.get('/scholarships', async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(scholarships).where(eq(scholarships.status, 'active'));
  return c.json({ success: true, data: items });
});

communityRouter.post('/scholarships', authMiddleware, requirePermission('community', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();
  const [scholarship] = await db.insert(scholarships).values({ ...body, createdById: userId }).returning();
  return c.json({ success: true, data: scholarship }, 201);
});

communityRouter.post('/scholarships/:id/apply', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();
  const [app] = await db.insert(scholarshipApplications).values({ scholarshipId: c.req.param('id'), userId, ...body }).returning();
  return c.json({ success: true, data: app }, 201);
});

// --- Mentorship ---
communityRouter.get('/mentorship/mentors', async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(mentorshipRelations).where(eq(mentorshipRelations.status, 'active'));
  return c.json({ success: true, data: items });
});

communityRouter.get('/mentorship/relations', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const items = await db.select().from(mentorshipRelations).where(eq(mentorshipRelations.menteeId, userId)).orderBy(desc(mentorshipRelations.createdAt));
  return c.json({ success: true, data: items });
});

communityRouter.post('/mentorship/request', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();
  const [rel] = await db.insert(mentorshipRelations).values({ ...body, menteeId: userId }).returning();
  return c.json({ success: true, data: rel }, 201);
});

communityRouter.post('/mentorship/:id/respond', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const { accept } = await c.req.json();
  const status = accept ? 'active' : 'cancelled';
  await db.update(mentorshipRelations).set({ status, startDate: accept ? new Date().toISOString() : undefined, updatedAt: new Date().toISOString() }).where(eq(mentorshipRelations.id, c.req.param('id')));
  return c.json({ success: true, data: { message: `Mentorship ${status}` } });
});

// --- Partnerships ---
communityRouter.get('/partnerships', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(partnerships).where(sql`deleted_at IS NULL`).orderBy(desc(partnerships.createdAt));
  return c.json({ success: true, data: items });
});

communityRouter.post('/partnerships', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();
  const [partner] = await db.insert(partnerships).values({ ...body, createdById: userId }).returning();
  return c.json({ success: true, data: partner }, 201);
});

// --- Volunteer ---
communityRouter.get('/volunteer/opportunities', async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(volunteerOpportunities).where(eq(volunteerOpportunities.status, 'open'));
  return c.json({ success: true, data: items });
});

communityRouter.post('/volunteer/opportunities', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();
  const [opp] = await db.insert(volunteerOpportunities).values({ ...body, createdById: userId }).returning();
  return c.json({ success: true, data: opp }, 201);
});

communityRouter.post('/volunteer/opportunities/:id/signup', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const [signup] = await db.insert(volunteerSignups).values({ opportunityId: c.req.param('id'), userId }).returning();
  return c.json({ success: true, data: signup }, 201);
});

// --- Donations ---
communityRouter.post('/donations', async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [donation] = await db.insert(donations).values(body).returning();
  return c.json({ success: true, data: donation }, 201);
});
