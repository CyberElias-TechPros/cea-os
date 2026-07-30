import { Hono } from 'hono';
import { getDb, visitorLogs } from '@cea/db';
import { eq, isNull } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware, requirePermission } from '../middleware/auth';
import { audit } from '../middleware/audit';

export const visitorsRouter = new Hono<Env>();

visitorsRouter.post('/request', async (c) => {
  const body = await c.req.json<{
    firstName: string; lastName: string; email: string; phone?: string;
    idType?: string; idNumber?: string; organization?: string;
    purpose: string; hostName?: string; notes?: string;
  }>();

  if (!body.firstName || !body.lastName || !body.email || !body.purpose) {
    return c.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Missing required fields' } }, 422);
  }

  const db = getDb(c.env.DB);
  const [log] = await db.insert(visitorLogs).values({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone,
    idType: body.idType as VisitorIdType,
    idNumber: body.idNumber,
    organization: body.organization,
    purpose: body.purpose as VisitorPurpose,
    hostName: body.hostName,
    notes: body.notes,
    status: 'pending',
    qrCode: `visitor-${crypto.randomUUID()}`,
  }).returning();

  return c.json({ success: true, data: log }, 201);
});

visitorsRouter.get('/', authMiddleware, requirePermission('visitors', 'read'), async (c) => {
  const db = getDb(c.env.DB);
  const all = await db.select().from(visitorLogs).where(isNull(visitorLogs.checkedOutAt)).orderBy(visitorLogs.createdAt);
  return c.json({ success: true, data: all });
});

visitorsRouter.patch('/:id/checkin', authMiddleware, requirePermission('visitors', 'update'), audit('checkin', 'visitors'), async (c) => {
  const db = getDb(c.env.DB);
  const id = c.req.param('id');
  await db.update(visitorLogs).set({ status: 'checked_in', checkedInAt: new Date() }).where(eq(visitorLogs.id, id));
  return c.json({ success: true, data: { message: 'Visitor checked in' } });
});

visitorsRouter.patch('/:id/checkout', authMiddleware, requirePermission('visitors', 'update'), audit('checkout', 'visitors'), async (c) => {
  const db = getDb(c.env.DB);
  const id = c.req.param('id');
  await db.update(visitorLogs).set({ status: 'checked_out', checkedOutAt: new Date() }).where(eq(visitorLogs.id, id));
  return c.json({ success: true, data: { message: 'Visitor checked out' } });
});

type VisitorPurpose = 'visit' | 'enrollment_inquiry' | 'delivery' | 'interview' | 'meeting' | 'event' | 'other';
type VisitorIdType = 'national_id' | 'passport' | 'drivers_license' | 'other';
