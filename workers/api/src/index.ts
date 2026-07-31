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
  };
  Variables: {
    userId: string;
    userRoles: string[];
    permissions: string[];
  };
};

const app = new Hono<Env>();

app.use('*', cors({
  origin: ['http://localhost:3000', 'https://cea.academy', 'https://staging.cea.academy'],
  credentials: true,
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

app.get('/v1/health', (c) => c.json({ status: 'ok', timestamp: Date.now() }));

app.onError(errorHandler);

app.notFound((c) => c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Route not found' } }, 404));

export default app;
