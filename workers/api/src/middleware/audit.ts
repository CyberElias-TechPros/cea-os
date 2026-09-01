import { createMiddleware } from 'hono/factory';
import type { Env } from '..';
import { auditLogs } from '@cea/db';
import { getDb } from '@cea/db';

/**
 * Writes an audit-log entry after a successful (2xx) request. Captures the
 * request body from a clone so the handler can still consume the real body.
 */
export function audit(action: string, resource: string) {
  return createMiddleware<Env>(async (c, next) => {
    let body: Record<string, unknown> = {};
    try {
      const cloned = c.req.raw.clone();
      if (cloned.headers.get('content-type')?.includes('application/json')) {
        body = (await cloned.json().catch(() => ({}))) as Record<string, unknown>;
      }
    } catch { /* ignore unreadable body */ }

    await next();

    if (c.res.status >= 200 && c.res.status < 300) {
      const db = getDb(c.env.DB);
      const userId = c.get('userId');

      await db.insert(auditLogs).values({
        userId,
        action: `${resource}.${action}`,
        resource,
        resourceId: c.req.param('id'),
        details: body,
        ipAddress: c.req.header('CF-Connecting-IP') ?? c.req.header('x-forwarded-for')?.split(',')[0]?.trim(),
        userAgent: c.req.header('user-agent'),
      }).catch((err) => console.error('Audit log failed:', err));
    }
  });
}
