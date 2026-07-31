-- Round 8: platform tables (executive, marketing, IT, webhooks, portals) + job offers
-- Requires: users, volunteer_signups, job_applications (already applied)

CREATE TABLE IF NOT EXISTS okrs (
  id text PRIMARY KEY NOT NULL,
  title text NOT NULL,
  objective text,
  period text NOT NULL,
  owner_id text REFERENCES users(id) ON DELETE SET NULL,
  metric text,
  target real,
  current real DEFAULT 0,
  status text DEFAULT 'draft' CHECK (status IN ('on_track','at_risk','behind','completed','draft')),
  notes text,
  created_at text NOT NULL,
  updated_at text NOT NULL
);

CREATE TABLE IF NOT EXISTS campaigns (
  id text PRIMARY KEY NOT NULL,
  name text NOT NULL,
  channel text DEFAULT 'email' CHECK (channel IN ('email','social','content','events','other')),
  audience text,
  subject text,
  content text,
  status text DEFAULT 'draft' CHECK (status IN ('draft','scheduled','sending','sent','paused')),
  scheduled_at text,
  sent_at text,
  sent_count integer DEFAULT 0,
  created_by_id text REFERENCES users(id) ON DELETE SET NULL,
  created_at text NOT NULL,
  updated_at text NOT NULL
);

CREATE TABLE IF NOT EXISTS content_calendar (
  id text PRIMARY KEY NOT NULL,
  title text NOT NULL,
  type text DEFAULT 'blog' CHECK (type IN ('blog','video','social_post','newsletter','webinar','other')),
  platform text DEFAULT 'website',
  publish_at text,
  status text DEFAULT 'idea' CHECK (status IN ('idea','draft','review','scheduled','published')),
  author_id text REFERENCES users(id) ON DELETE SET NULL,
  created_at text NOT NULL,
  updated_at text NOT NULL
);

CREATE TABLE IF NOT EXISTS knowledge_base_articles (
  id text PRIMARY KEY NOT NULL,
  title text NOT NULL,
  category text DEFAULT 'faq' CHECK (category IN ('faq','troubleshooting','howto','policy','training')),
  body text,
  author_id text REFERENCES users(id) ON DELETE SET NULL,
  helpful_count integer DEFAULT 0,
  published integer DEFAULT 1,
  created_at text NOT NULL,
  updated_at text NOT NULL
);

CREATE TABLE IF NOT EXISTS webhooks (
  id text PRIMARY KEY NOT NULL,
  name text NOT NULL,
  url text NOT NULL,
  secret text,
  events text DEFAULT '[]',
  enabled integer DEFAULT 1,
  last_delivered_at text,
  created_at text NOT NULL
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id text PRIMARY KEY NOT NULL,
  email text NOT NULL UNIQUE,
  first_name text,
  source text DEFAULT 'footer',
  status text DEFAULT 'subscribed' CHECK (status IN ('subscribed','unsubscribed','bounced')),
  created_at text NOT NULL
);

CREATE TABLE IF NOT EXISTS ward_links (
  id text PRIMARY KEY NOT NULL,
  parent_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  relation text DEFAULT 'guardian',
  created_at text NOT NULL
);

CREATE TABLE IF NOT EXISTS intern_tasks (
  id text PRIMARY KEY NOT NULL,
  intern_user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  due_date text,
  status text DEFAULT 'todo' CHECK (status IN ('todo','in_progress','review','done')),
  assigned_by_id text REFERENCES users(id) ON DELETE SET NULL,
  created_at text NOT NULL,
  updated_at text NOT NULL
);

CREATE TABLE IF NOT EXISTS intern_timesheets (
  id text PRIMARY KEY NOT NULL,
  intern_user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date text NOT NULL,
  hours real NOT NULL,
  description text,
  status text DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  created_at text NOT NULL
);

CREATE TABLE IF NOT EXISTS volunteer_hours (
  id text PRIMARY KEY NOT NULL,
  volunteer_user_id text NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  signup_id text REFERENCES volunteer_signups(id) ON DELETE SET NULL,
  date text NOT NULL,
  hours real NOT NULL,
  description text,
  status text DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  created_at text NOT NULL
);

CREATE TABLE IF NOT EXISTS job_offers (
  id text PRIMARY KEY NOT NULL,
  application_id text NOT NULL REFERENCES job_applications(id) ON DELETE CASCADE,
  salary real,
  salary_currency text DEFAULT 'ZAR',
  employment_type text DEFAULT 'full_time',
  start_date text,
  notes text,
  status text DEFAULT 'pending' CHECK (status IN ('pending','accepted','declined','withdrawn')),
  offered_by_id text REFERENCES users(id) ON DELETE SET NULL,
  responded_at integer,
  created_at integer NOT NULL,
  updated_at integer NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_okrs_owner ON okrs(owner_id);
CREATE INDEX IF NOT EXISTS idx_okrs_period ON okrs(period);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_calendar_status ON content_calendar(status);
CREATE INDEX IF NOT EXISTS idx_kb_category ON knowledge_base_articles(category);
CREATE INDEX IF NOT EXISTS idx_subs_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_ward_parent ON ward_links(parent_id);
CREATE INDEX IF NOT EXISTS idx_ward_student ON ward_links(student_user_id);
CREATE INDEX IF NOT EXISTS idx_intern_tasks_user ON intern_tasks(intern_user_id);
CREATE INDEX IF NOT EXISTS idx_timesheets_user ON intern_timesheets(intern_user_id);
CREATE INDEX IF NOT EXISTS idx_vol_hours_user ON volunteer_hours(volunteer_user_id);
CREATE INDEX IF NOT EXISTS idx_job_offers_app ON job_offers(application_id);
CREATE INDEX IF NOT EXISTS idx_job_offers_status ON job_offers(status);
