import { Hono } from 'hono';
import { getDb, conversations, conversationParticipants, messages } from '@cea/db';
import { eq, and, asc, desc } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware } from '../middleware/auth';

export const messagingRouter = new Hono<Env>();

messagingRouter.get('/conversations', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');

  const participantRows = await db.select().from(conversationParticipants).where(eq(conversationParticipants.userId, userId));
  const convIds = participantRows.map((p) => p.conversationId);

  if (convIds.length === 0) return c.json({ success: true, data: [] });

  const convs = await Promise.all(
    convIds.map(async (id) => {
      const result = await db.select().from(conversations).where(eq(conversations.id, id)).limit(1);
      const conv = result[0]!;
      const lastMsg = await db.select().from(messages)
        .where(eq(messages.conversationId, id))
        .orderBy(desc(messages.createdAt))
        .limit(1);
      return { ...conv, lastMessage: lastMsg[0] ?? null };
    })
  );

  return c.json({ success: true, data: convs.sort((a, b) => Number(b.lastMessage?.createdAt ?? 0) - Number(a.lastMessage?.createdAt ?? 0)) });
});

messagingRouter.post('/conversations', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const { type, title, participantIds } = await c.req.json();

  const inserted = await db.insert(conversations).values({ type, title, createdById: userId }).returning();
  const conv = inserted[0]!;

  await db.insert(conversationParticipants).values({ conversationId: conv.id, userId });
  for (const pid of (participantIds as string[]) ?? []) {
    await db.insert(conversationParticipants).values({ conversationId: conv.id, userId: pid });
  }

  return c.json({ success: true, data: conv }, 201);
});

messagingRouter.get('/conversations/:id/messages', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const convId = c.req.param('id');
  const userId = c.get('userId');

  const [participant] = await db.select().from(conversationParticipants)
    .where(and(eq(conversationParticipants.conversationId, convId), eq(conversationParticipants.userId, userId)))
    .limit(1);
  if (!participant) return c.json({ success: false, error: { code: 'FORBIDDEN', message: 'Not a participant' } }, 403);

  const msgs = await db.select().from(messages)
    .where(eq(messages.conversationId, convId))
    .orderBy(asc(messages.createdAt));

  return c.json({ success: true, data: msgs });
});

messagingRouter.post('/conversations/:id/messages', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const convId = c.req.param('id');
  const userId = c.get('userId');
  const { content, messageType, replyToId } = await c.req.json();

  const [participant] = await db.select().from(conversationParticipants)
    .where(and(eq(conversationParticipants.conversationId, convId), eq(conversationParticipants.userId, userId)))
    .limit(1);
  if (!participant) return c.json({ success: false, error: { code: 'FORBIDDEN', message: 'Not a participant' } }, 403);

  const [msg] = await db.insert(messages).values({
    conversationId: convId, senderId: userId, content, messageType, replyToId,
  }).returning();

  await db.update(conversations).set({ lastMessageAt: new Date() }).where(eq(conversations.id, convId));

  return c.json({ success: true, data: msg }, 201);
});
