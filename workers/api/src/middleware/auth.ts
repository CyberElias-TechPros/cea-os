import { createMiddleware } from 'hono/factory';
import { verify } from 'jsonwebtoken';
import type { Env } from '..';

interface JwtPayload {
  sub: string;
  roles: string[];
  permissions: string[];
  exp: number;
}

export const authMiddleware = createMiddleware<Env>(async (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Missing or invalid token' } }, 401);
  }

  const token = authHeader.slice(7);
  try {
    const payload = verify(token, c.env.JWT_SECRET) as JwtPayload;
    c.set('userId', payload.sub);
    c.set('userRoles', payload.roles);
    c.set('permissions', payload.permissions);
  } catch {
    return c.json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Token expired or invalid' } }, 401);
  }

  await next();
});

export function requirePermission(resource: string, action: string) {
  return createMiddleware<Env>(async (c, next) => {
    const permissions = c.get('permissions');
    const hasPermission = permissions.some(
      (p) => p === `${resource}.${action}` || p === `${resource}.manage` || p === 'admin.*',
    );
    if (!hasPermission) {
      return c.json({ success: false, error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } }, 403);
    }
    await next();
  });
}

/** Require one of the given role slugs (e.g. 'staff', 'admin'). */
export function requireRole(...slugs: string[]) {
  return createMiddleware<Env>(async (c, next) => {
    const roles = c.get('userRoles');
    const allowed = slugs.some((s) => roles.includes(s));
    if (!allowed) {
      return c.json({ success: false, error: { code: 'FORBIDDEN', message: 'Insufficient role' } }, 403);
    }
    await next();
  });
}

/** True when the current request carries a staff-level role. */
export const STAFF_ROLES = ['admin', 'staff'];
export const FACULTY_ROLES = ['admin', 'staff', 'instructor'];
