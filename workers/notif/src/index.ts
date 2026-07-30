import { getDb, notifications, users } from '@cea/db';
import { eq } from 'drizzle-orm';

interface NotificationMessage {
  userId: string;
  title: string;
  body: string;
  category?: string;
  actionUrl?: string;
  icon?: string;
  priority?: string;
  templateKey?: string;
  templateData?: Record<string, unknown>;
}

export default {
  async queue(batch: MessageBatch<NotificationMessage>, env: { DB: D1Database }): Promise<void> {
    const db = getDb(env.DB);

    for (const msg of batch.messages) {
      const { userId, title, body, category, actionUrl, icon, priority, templateKey, templateData } = msg.body;

      try {
        await db.insert(notifications).values({
          userId,
          title,
          body,
          category: category as NotificationCategory,
          actionUrl,
          icon,
          priority: priority as NotificationPriority,
          templateKey,
          templateData,
          channel: 'in_app',
          status: 'unread',
        });
        msg.ack();
      } catch (err) {
        console.error('[NOTIF] Failed to create notification:', err);
        msg.retry();
      }
    }
  },
};

type NotificationCategory = 'learning' | 'assignments' | 'grades' | 'attendance' | 'finance' | 'community' | 'events' | 'career' | 'system' | 'security' | 'marketing';
type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';
