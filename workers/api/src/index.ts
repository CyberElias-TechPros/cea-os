import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import { authRouter } from './routes/auth';
import { usersRouter } from './routes/users';
import { visitorsRouter } from './routes/visitors';
import { notificationsRouter } from './routes/notifications';
import { coursesRouter, lessonsRouter, enrollmentsRouter } from './routes/learning';
import { assignmentsRouter } from './routes/assignments';
import { assessmentsRouter } from './routes/assessments';
import { gradebookRouter } from './routes/gradebook';
import { attendanceRouter } from './routes/attendance';
import { certificatesRouter } from './routes/certificates';
import { messagingRouter } from './routes/messaging';
import { portfolioRouter } from './routes/portfolio';
import { marketplaceRouter } from './routes/marketplace';
import { alumniRouter } from './routes/alumni';
import { crmRouter } from './routes/crm';
import { projectsRouter } from './routes/projects';
import { ticketsRouter } from './routes/tickets';
import { contractsRouter } from './routes/contracts';
import { invoicesRouter } from './routes/invoices';
import { admissionsRouter } from './routes/admissions';
import { financeRouter } from './routes/finance';
import { hrRouter } from './routes/hr';
import { inventoryRouter } from './routes/inventory';
import { procurementRouter } from './routes/procurement';
import { communityRouter } from './routes/community';
import { analyticsRouter } from './routes/analytics';
import { adminRouter } from './routes/admin';
import { facilitiesRouter } from './routes/facilities';
import { platformRouter } from './routes/platform';
import { uploadsRouter } from './routes/uploads';
import { errorHandler } from './middleware/errorHandler';

export type Env = {
  Bindings: {
    DB: D1Database;
    SESSION_KV: KVNamespace;
    CACHE_KV: KVNamespace;
    UPLOADS: R2Bucket;
    EMAIL_QUEUE: Queue<unknown>;
    NOTIF_QUEUE: Queue<unknown>;
    JWT_SECRET: string;
    APP_URL: string;
    ALLOWED_ORIGINS?: string;
    CONTACT_EMAIL?: string;
    R2_ACCOUNT_ID?: string;
    R2_ACCESS_KEY_ID?: string;
    R2_SECRET_ACCESS_KEY?: string;
    R2_BUCKET?: string;
  };
  Variables: {
    userId: string;
    userRoles: string[];
    permissions: string[];
  };
};

const app = new Hono<Env>();

function isAllowedOrigin(env: Env['Bindings'], origin: string): boolean {
  const configured = (env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const defaults = ['http://localhost:3000', 'http://localhost:3001', env.APP_URL].filter(Boolean);
  const origins = new Set([...configured, ...defaults]);

  // In local/dev mode (APP_URL unset or localhost) accept any localhost origin
  // so preview proxies keep working; production restricts to the allow-list.
  const isDev = !env.APP_URL || env.APP_URL.startsWith('http://localhost');
  if (isDev) return origin.startsWith('http://localhost') || origins.has(origin);
  return origins.has(origin);
}

app.use('*', cors({
  origin: (origin, c) => (origin && isAllowedOrigin(c.env, origin) ? origin : null),
  credentials: true,
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  maxAge: 86400,
}));
app.use('*', secureHeaders());
app.use('*', logger());

app.use('*', async (c, next) => {
  c.res.headers.set('X-Request-Id', crypto.randomUUID());
  await next();
});

app.route('/v1/auth', authRouter);
app.route('/v1/users', usersRouter);
app.route('/v1/visitors', visitorsRouter);
app.route('/v1/notifications', notificationsRouter);
app.route('/v1/courses', coursesRouter);
app.route('/v1/modules', lessonsRouter);
app.route('/v1/enrollments', enrollmentsRouter);
app.route('/v1/assignments', assignmentsRouter);
app.route('/v1/assessments', assessmentsRouter);
app.route('/v1/gradebook', gradebookRouter);
app.route('/v1/attendance', attendanceRouter);
app.route('/v1/certificates', certificatesRouter);
app.route('/v1/messaging', messagingRouter);
app.route('/v1/portfolio', portfolioRouter);
app.route('/v1/marketplace', marketplaceRouter);
app.route('/v1/alumni', alumniRouter);
app.route('/v1/crm', crmRouter);
app.route('/v1/projects', projectsRouter);
app.route('/v1/tickets', ticketsRouter);
app.route('/v1/contracts', contractsRouter);
app.route('/v1/invoices', invoicesRouter);
app.route('/v1/admissions', admissionsRouter);
app.route('/v1/finance', financeRouter);
app.route('/v1/hr', hrRouter);
app.route('/v1/inventory', inventoryRouter);
app.route('/v1/procurement', procurementRouter);
app.route('/v1/community', communityRouter);
app.route('/v1/analytics', analyticsRouter);
app.route('/v1/admin', adminRouter);
app.route('/v1/facilities', facilitiesRouter);
app.route('/v1/platform', platformRouter);
app.route('/v1/uploads', uploadsRouter);

app.get('/v1/health', (c) => c.json({ status: 'ok', timestamp: Date.now() }));

app.onError(errorHandler);

app.notFound((c) => c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Route not found' } }, 404));

export default app;

export { RealtimeRoom } from "./realtime";
