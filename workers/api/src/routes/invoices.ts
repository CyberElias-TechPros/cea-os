import { Hono } from 'hono';
import { getDb, invoices, invoiceLineItems } from '@cea/db';
import { eq, and, desc } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware, requireRole, STAFF_ROLES } from '../middleware/auth';
import { sendNotification } from '../services/notification';

export const invoicesRouter = new Hono<Env>();

invoicesRouter.get('/', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const { status } = c.req.query();
  const userId = c.get('userId');
  const roles = c.get('userRoles');
  const isStaff = roles.some((r) => STAFF_ROLES.includes(r));
  const conditions: any[] = [sql`deleted_at IS NULL`];
  if (status) conditions.push(eq(invoices.status, status as any));
  // Non-staff users may only see invoices they created.
  if (!isStaff) conditions.push(eq(invoices.createdById, userId));
  const items = await db.select().from(invoices).where(and(...conditions)).orderBy(desc(invoices.createdAt));
  return c.json({ success: true, data: items });
});

invoicesRouter.get('/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const roles = c.get('userRoles');
  const isStaff = roles.some((r) => STAFF_ROLES.includes(r));
  const [invoice] = await db.select().from(invoices).where(eq(invoices.id, c.req.param('id'))).limit(1);
  if (!invoice) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Invoice not found' } }, 404);
  if (!isStaff && invoice.createdById !== userId) {
    return c.json({ success: false, error: { code: 'FORBIDDEN', message: 'Not authorized' } }, 403);
  }
  const items = await db.select().from(invoiceLineItems).where(eq(invoiceLineItems.invoiceId, invoice.id));
  return c.json({ success: true, data: { ...invoice, lineItems: items } });
});

invoicesRouter.post('/', authMiddleware, requireRole('admin', 'staff'), async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const { lineItems, ...body } = await c.req.json();
  const invoiceNumber = 'INV-' + Date.now().toString(36).toUpperCase();
  const [invoice] = await db.insert(invoices).values({ ...body, invoiceNumber, createdById: userId }).returning();
  if (Array.isArray(lineItems) && lineItems.length) {
    await db.insert(invoiceLineItems).values(lineItems.map((li: any) => ({ ...li, invoiceId: invoice!.id })));
  }

  if (body.clientId) {
    await sendNotification(c.env, {
      userId: body.clientId,
      title: 'New Invoice',
      body: `Invoice ${invoice!.invoiceNumber} has been created`,
      category: 'finance',
      actionUrl: `/dashboard/invoices/${invoice!.id}`,
      icon: 'file-text',
    });
  }

  return c.json({ success: true, data: invoice! }, 201);
});

invoicesRouter.patch('/:id', authMiddleware, requireRole('admin', 'staff'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  await db.update(invoices).set({ ...body, updatedAt: new Date().toISOString() }).where(eq(invoices.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Invoice updated' } });
});

invoicesRouter.post('/:id/send', authMiddleware, requireRole('admin', 'staff'), async (c) => {
  const db = getDb(c.env.DB);
  const invId = c.req.param('id');
  await db.update(invoices).set({ status: 'sent', updatedAt: new Date().toISOString() }).where(eq(invoices.id, invId));

  const [inv] = await db.select().from(invoices).where(eq(invoices.id, invId)).limit(1);
  if (inv?.clientId) {
    await sendNotification(c.env, {
      userId: inv.clientId,
      title: 'Invoice Sent',
      body: `Invoice ${inv.invoiceNumber} has been sent`,
      category: 'finance',
      actionUrl: `/dashboard/invoices/${invId}`,
      icon: 'send',
    });
  }

  return c.json({ success: true, data: { message: 'Invoice sent' } });
});

invoicesRouter.post('/:id/pay', authMiddleware, requireRole('admin', 'staff'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const payInvId = c.req.param('id');
  await db.update(invoices).set({
    status: 'paid',
    paidAt: new Date().toISOString(),
    paymentMethod: body.paymentMethod,
    paymentReference: body.paymentReference,
    updatedAt: new Date().toISOString(),
  }).where(eq(invoices.id, payInvId));

  const [paidInv] = await db.select().from(invoices).where(eq(invoices.id, payInvId)).limit(1);
  if (paidInv?.createdById) {
    await sendNotification(c.env, {
      userId: paidInv.createdById,
      title: 'Payment Received',
      body: `Invoice ${paidInv.invoiceNumber} has been paid`,
      category: 'finance',
      actionUrl: `/dashboard/invoices/${payInvId}`,
      icon: 'credit-card',
    });
  }

  return c.json({ success: true, data: { message: 'Payment recorded' } });
});

invoicesRouter.delete('/:id', authMiddleware, requireRole('admin', 'staff'), async (c) => {
  const db = getDb(c.env.DB);
  await db.update(invoices).set({ status: 'cancelled', deletedAt: new Date().toISOString() }).where(eq(invoices.id, c.req.param('id')));
  return c.json({ success: true, data: { message: 'Invoice cancelled' } });
});
