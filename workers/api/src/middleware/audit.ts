import { createMiddleware } from 'hono/factory';
import type { Env } from '..';
import { auditLogs } from '@cea/db';
import { getDb } from '@cea/db';

export function audit(action: string, resource: string) {
  return createMiddleware<Env>(async (c, next) => {
    await next();

    if (c.res.status >= 200 && c.res.status < 300) {
      const db = getDb(c.env.DB);
      const userId = c.get('userId');
      const details: Record<string, unknown> = {};

      try {
        const body = await c.req.json().catch(() => ({}));
        details.body = body;
      } catch { /* ignore */ }

      await db.insert(auditLogs).values({
        userId,
        action: `${resource}.${action}`,
        resource,
        resourceId: c.req.param('id'),
        details,
        ipAddress: c.req.header('CF-Connecting-IP') ?? c.req.header('x-forwarded-for'),
        userAgent: c.req.header('user-agent'),
      }).catch((err) => console.error('Audit log failed:', err));
    }
  });
}
