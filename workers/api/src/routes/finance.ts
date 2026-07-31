import { Hono } from 'hono';
import { getDb, chartOfAccounts, transactions, expenseClaims, budgets, payrollRuns, payslips, employees, users } from '@cea/db';
import { eq, and, desc, asc, count } from 'drizzle-orm';
import { sql } from 'drizzle-orm';
import type { Env } from '..';
import { authMiddleware, requirePermission } from '../middleware/auth';

export const financeRouter = new Hono<Env>();

financeRouter.get('/accounts', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(chartOfAccounts).orderBy(asc(chartOfAccounts.code));
  return c.json({ success: true, data: items });
});

financeRouter.post('/accounts', authMiddleware, requirePermission('finance', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [item] = await db.insert(chartOfAccounts).values(body).returning();
  return c.json({ success: true, data: item }, 201);
});

financeRouter.get('/transactions', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const { accountId, type, category } = c.req.query();
  const conditions: any[] = [];
  if (accountId) conditions.push(eq(transactions.accountId, accountId));
  if (type) conditions.push(eq(transactions.type, type as any));
  if (category) conditions.push(eq(transactions.category, category as any));
  const items = await db.select().from(transactions).where(and(...conditions)).orderBy(desc(transactions.transactionDate));
  return c.json({ success: true, data: items });
});

financeRouter.post('/transactions', authMiddleware, requirePermission('finance', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();
  const [tx] = await db.insert(transactions).values({ ...body, recordedById: userId }).returning();
  return c.json({ success: true, data: tx }, 201);
});

financeRouter.get('/expenses', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const { status } = c.req.query();
  const conditions: any[] = [eq(expenseClaims.userId, userId)];
  if (status) conditions.push(eq(expenseClaims.status, status as any));
  const items = await db.select().from(expenseClaims).where(and(...conditions)).orderBy(desc(expenseClaims.createdAt));
  return c.json({ success: true, data: items });
});

financeRouter.post('/expenses', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const body = await c.req.json();
  const [claim] = await db.insert(expenseClaims).values({ ...body, userId }).returning();
  return c.json({ success: true, data: claim }, 201);
});

financeRouter.post('/expenses/:id/approve', authMiddleware, requirePermission('finance', 'update'), async (c) => {
  const db = getDb(c.env.DB);
  const { approved } = await c.req.json();
  const status = approved ? 'approved' : 'rejected';
  await db.update(expenseClaims).set({ status, approvedById: c.get('userId'), approvedAt: new Date().toISOString(), updatedAt: new Date().toISOString() }).where(eq(expenseClaims.id, c.req.param('id')));
  return c.json({ success: true, data: { message: `Expense ${status}` } });
});

financeRouter.get('/budgets', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(budgets).orderBy(desc(budgets.createdAt));
  return c.json({ success: true, data: items });
});

financeRouter.post('/budgets', authMiddleware, requirePermission('finance', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  const body = await c.req.json();
  const [budget] = await db.insert(budgets).values(body).returning();
  return c.json({ success: true, data: budget }, 201);
});

financeRouter.get('/payroll/runs', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const items = await db.select().from(payrollRuns).orderBy(desc(payrollRuns.period));
  return c.json({ success: true, data: items });
});

financeRouter.post('/payroll/runs', authMiddleware, requirePermission('finance', 'create'), async (c) => {
  const db = getDb(c.env.DB);
  const { period } = await c.req.json();
  if (!period) return c.json({ success: false, error: { code: 'BAD_REQUEST', message: 'Period (YYYY-MM) is required' } }, 400);
  const [existing] = await db.select().from(payrollRuns).where(eq(payrollRuns.period, period)).limit(1);
  if (existing) return c.json({ success: false, error: { code: 'CONFLICT', message: `Payroll for ${period} already exists` } }, 409);
  const staff = await db.select().from(employees).where(and(eq(employees.status, 'active'), sql`salary IS NOT NULL`));
  if (staff.length === 0) return c.json({ success: false, error: { code: 'NO_EMPLOYEES', message: 'No active employees with a salary on file' } }, 400);
  const userId = c.get('userId');
  const run = (await db.insert(payrollRuns).values({ period, payslipCount: staff.length, processedById: userId, status: 'draft' }).returning())[0];
  if (!run) return c.json({ success: false, error: { code: 'ERROR', message: 'Could not create payroll run' } }, 500);
  let gross = 0;
  let net = 0;
  for (const emp of staff) {
    const grossPay = emp.salary ?? 0;
    const tax = Math.round(grossPay * 0.15 * 100) / 100;
    const netPay = grossPay - tax;
    gross += grossPay;
    net += netPay;
    await db.insert(payslips).values({ runId: run.id, employeeId: emp.id, basicPay: grossPay, allowances: 0, deductions: tax, grossPay, netPay });
  }
  await db.update(payrollRuns).set({ grossTotal: Math.round(gross * 100) / 100, netTotal: Math.round(net * 100) / 100 }).where(eq(payrollRuns.id, run.id));
  return c.json({ success: true, data: { ...run, grossTotal: Math.round(gross * 100) / 100, netTotal: Math.round(net * 100) / 100 } }, 201);
});

financeRouter.get('/payroll/runs/:id', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const [run] = await db.select().from(payrollRuns).where(eq(payrollRuns.id, c.req.param('id'))).limit(1);
  if (!run) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Payroll run not found' } }, 404);
  const rows = await db
    .select({
      id: payslips.id,
      basicPay: payslips.basicPay,
      allowances: payslips.allowances,
      deductions: payslips.deductions,
      grossPay: payslips.grossPay,
      netPay: payslips.netPay,
      status: payslips.status,
      paidAt: payslips.paidAt,
      createdAt: payslips.createdAt,
      employeeCode: employees.employeeCode,
      position: employees.position,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
    })
    .from(payslips)
    .leftJoin(employees, eq(payslips.employeeId, employees.id))
    .leftJoin(users, eq(employees.userId, users.id))
    .where(eq(payslips.runId, run.id));
  return c.json({ success: true, data: { ...run, payslips: rows } });
});

financeRouter.post('/payroll/runs/:id/approve', authMiddleware, requirePermission('finance', 'update'), async (c) => {
  const db = getDb(c.env.DB);
  const { approved } = await c.req.json();
  const status = approved ? 'approved' : 'draft';
  await db.update(payrollRuns).set({ status, approvedById: c.get('userId'), approvedAt: approved ? new Date().toISOString() : null, updatedAt: new Date().toISOString() }).where(eq(payrollRuns.id, c.req.param('id')));
  return c.json({ success: true, data: { message: `Payroll run ${status}` } });
});

financeRouter.post('/payslips/:id/pay', authMiddleware, requirePermission('finance', 'update'), async (c) => {
  const db = getDb(c.env.DB);
  const [slip] = await db.select().from(payslips).where(eq(payslips.id, c.req.param('id'))).limit(1);
  if (!slip) return c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Payslip not found' } }, 404);
  const now = new Date().toISOString();
  await db.update(payslips).set({ status: 'paid', paidAt: now }).where(eq(payslips.id, slip.id));
  const [salaryAccount] = await db.select().from(chartOfAccounts).where(eq(chartOfAccounts.code, 'SALARY')).limit(1);
  if (salaryAccount) {
    await db.insert(transactions).values({
      accountId: salaryAccount.id,
      type: 'credit',
      amount: slip.netPay ?? 0,
      category: 'salary',
      description: `Salary payment (payslip)`,
      reference: `PAY-${slip.runId.slice(0, 8).toUpperCase()}`,
      recordedById: c.get('userId'),
      transactionDate: now,
    });
  }
  const [run] = await db.select().from(payrollRuns).where(eq(payrollRuns.id, slip.runId)).limit(1);
  if (run) {
    const pending = await db.select({ count: count() }).from(payslips).where(and(eq(payslips.runId, run.id), eq(payslips.status, 'pending')));
    if ((pending[0]?.count ?? 0) === 0) {
      await db.update(payrollRuns).set({ status: 'paid', paidAt: now, updatedAt: now }).where(eq(payrollRuns.id, run.id));
    }
  }
  return c.json({ success: true, data: { message: 'Payslip marked as paid' } });
});

financeRouter.get('/payroll/my-payslips', authMiddleware, async (c) => {
  const db = getDb(c.env.DB);
  const userId = c.get('userId');
  const [emp] = await db.select().from(employees).where(eq(employees.userId, userId)).limit(1);
  if (!emp) return c.json({ success: true, data: [] });
  const rows = await db
    .select({
      id: payslips.id,
      runId: payslips.runId,
      basicPay: payslips.basicPay,
      allowances: payslips.allowances,
      deductions: payslips.deductions,
      grossPay: payslips.grossPay,
      netPay: payslips.netPay,
      status: payslips.status,
      paidAt: payslips.paidAt,
      createdAt: payslips.createdAt,
      period: payrollRuns.period,
      runStatus: payrollRuns.status,
    })
    .from(payslips)
    .innerJoin(payrollRuns, eq(payslips.runId, payrollRuns.id))
    .where(eq(payslips.employeeId, emp.id))
    .orderBy(desc(payrollRuns.period));
  return c.json({ success: true, data: rows });
});
