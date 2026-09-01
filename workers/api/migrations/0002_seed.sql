-- 0002_seed.sql
-- Idempotent seed: system roles, permission catalog, role→permission grants,
-- and a bootstrap administrator account.
--
-- SECURITY NOTE: the bootstrap admin password is `Admin@CEA-2026!`.
-- CHANGE IT IMMEDIATELY after first login (dashboard → Profile → Security).

INSERT INTO roles (id, name, slug, description, hierarchy, is_system, created_at, updated_at)
SELECT lower(hex(randomblob(12))), 'Administrator', 'admin', 'Full platform access', 100, 1, unixepoch(), unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE slug = 'admin');

INSERT INTO roles (id, name, slug, description, hierarchy, is_system, created_at, updated_at)
SELECT lower(hex(randomblob(12))), 'Student', 'student', 'Enrolled learner', 10, 1, unixepoch(), unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE slug = 'student');

INSERT INTO roles (id, name, slug, description, hierarchy, is_system, created_at, updated_at)
SELECT lower(hex(randomblob(12))), 'Alumni', 'alumni', 'Graduated learner', 20, 1, unixepoch(), unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE slug = 'alumni');

INSERT INTO roles (id, name, slug, description, hierarchy, is_system, created_at, updated_at)
SELECT lower(hex(randomblob(12))), 'Staff', 'staff', 'Institute staff member', 50, 1, unixepoch(), unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE slug = 'staff');

INSERT INTO roles (id, name, slug, description, hierarchy, is_system, created_at, updated_at)
SELECT lower(hex(randomblob(12))), 'Instructor', 'instructor', 'Course instructor', 40, 1, unixepoch(), unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE slug = 'instructor');

INSERT INTO roles (id, name, slug, description, hierarchy, is_system, created_at, updated_at)
SELECT lower(hex(randomblob(12))), 'Employer', 'employer', 'Hiring partner', 30, 1, unixepoch(), unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE slug = 'employer');

INSERT INTO roles (id, name, slug, description, hierarchy, is_system, created_at, updated_at)
SELECT lower(hex(randomblob(12))), 'Mentor', 'mentor', 'Alumni mentor', 35, 1, unixepoch(), unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE slug = 'mentor');

INSERT INTO roles (id, name, slug, description, hierarchy, is_system, created_at, updated_at)
SELECT lower(hex(randomblob(12))), 'Supplier', 'supplier', 'External supplier portal access', 25, 0, unixepoch(), unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE slug = 'supplier');

INSERT INTO roles (id, name, slug, description, hierarchy, is_system, created_at, updated_at)
SELECT lower(hex(randomblob(12))), 'Partner', 'partner', 'Partner organization portal access', 25, 0, unixepoch(), unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE slug = 'partner');

INSERT INTO roles (id, name, slug, description, hierarchy, is_system, created_at, updated_at)
SELECT lower(hex(randomblob(12))), 'Parent', 'parent', 'Parent/guardian portal access', 15, 0, unixepoch(), unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE slug = 'parent');

INSERT INTO roles (id, name, slug, description, hierarchy, is_system, created_at, updated_at)
SELECT lower(hex(randomblob(12))), 'Volunteer', 'volunteer', 'Volunteer portal access', 15, 0, unixepoch(), unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE slug = 'volunteer');

INSERT INTO roles (id, name, slug, description, hierarchy, is_system, created_at, updated_at)
SELECT lower(hex(randomblob(12))), 'Intern', 'intern', 'Intern portal access', 15, 0, unixepoch(), unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE slug = 'intern');

INSERT INTO roles (id, name, slug, description, hierarchy, is_system, created_at, updated_at)
SELECT lower(hex(randomblob(12))), 'NGO', 'ngo', 'NGO partner portal access', 25, 0, unixepoch(), unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE slug = 'ngo');

INSERT INTO roles (id, name, slug, description, hierarchy, is_system, created_at, updated_at)
SELECT lower(hex(randomblob(12))), 'Government', 'government', 'Government compliance portal access', 25, 0, unixepoch(), unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE slug = 'government');

-- ---------------------------------------------------------------------------
-- Permission catalog (kept in sync with packages/... wait, with
-- workers/api/src/lib/permissions.ts)
-- ---------------------------------------------------------------------------
INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'users', 'read', 'View users', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'users' AND action = 'read');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'users', 'update', 'Edit users', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'users' AND action = 'update');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'users', 'delete', 'Deactivate users', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'users' AND action = 'delete');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'courses', 'create', 'Create courses', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'courses' AND action = 'create');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'courses', 'update', 'Edit courses and modules', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'courses' AND action = 'update');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'courses', 'delete', 'Delete courses', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'courses' AND action = 'delete');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'certificates', 'create', 'Issue certificates', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'certificates' AND action = 'create');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'attendance', 'create', 'Mark attendance', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'attendance' AND action = 'create');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'assignments', 'create', 'Create assignments', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'assignments' AND action = 'create');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'assignments', 'update', 'Edit and grade assignments', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'assignments' AND action = 'update');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'assignments', 'read', 'View submissions', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'assignments' AND action = 'read');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'inventory', 'create', 'Add inventory items', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'inventory' AND action = 'create');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'inventory', 'update', 'Edit inventory and movements', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'inventory' AND action = 'update');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'inventory', 'delete', 'Remove inventory', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'inventory' AND action = 'delete');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'analytics', 'read', 'View analytics and reports', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'analytics' AND action = 'read');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'assessments', 'create', 'Create assessments', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'assessments' AND action = 'create');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'assessments', 'update', 'Edit assessments and questions', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'assessments' AND action = 'update');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'hr', 'create', 'Add staff records', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'hr' AND action = 'create');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'hr', 'update', 'Edit staff records and decide leave', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'hr' AND action = 'update');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'placements', 'create', 'Log placements', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'placements' AND action = 'create');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'community', 'create', 'Create forum categories and scholarships', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'community' AND action = 'create');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'finance', 'create', 'Create accounts and transactions', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'finance' AND action = 'create');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'finance', 'update', 'Approve expenses and manage budgets', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'finance' AND action = 'update');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'admissions', 'create', 'Manage admissions and offers', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'admissions' AND action = 'create');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'admissions', 'read', 'View and review applications', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'admissions' AND action = 'read');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'admissions', 'update', 'Update application status and decisions', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'admissions' AND action = 'update');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'procurement', 'create', 'Approve purchase orders', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'procurement' AND action = 'create');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'visitors', 'read', 'View visitor records', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'visitors' AND action = 'read');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'visitors', 'update', 'Check visitors in and out', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'visitors' AND action = 'update');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'marketing', 'read', 'View campaigns and leads', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'marketing' AND action = 'read');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'marketing', 'create', 'Create and send campaigns', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'marketing' AND action = 'create');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'marketing', 'update', 'Edit content calendar', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'marketing' AND action = 'update');

INSERT INTO permissions (id, resource, action, description, created_at)
SELECT lower(hex(randomblob(12))), 'admin', 'update', 'Manage webhooks and system config', unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM permissions WHERE resource = 'admin' AND action = 'update');

-- ---------------------------------------------------------------------------
-- Role → permission grants.
-- `admin` is granted everything (the auth layer also short-circuits on admin.*).
-- ---------------------------------------------------------------------------
INSERT INTO role_permissions (id, role_id, permission_id, created_at)
SELECT lower(hex(randomblob(12))), r.id, p.id, unixepoch()
FROM roles r, permissions p
WHERE r.slug = 'admin'
  AND NOT EXISTS (SELECT 1 FROM role_permissions rp WHERE rp.role_id = r.id AND rp.permission_id = p.id);

-- staff: broad operational access
INSERT INTO role_permissions (id, role_id, permission_id, created_at)
SELECT lower(hex(randomblob(12))), r.id, p.id, unixepoch()
FROM roles r, permissions p
WHERE r.slug = 'staff'
  AND p.resource IN ('users','courses','certificates','attendance','assignments','inventory','analytics',
                     'assessments','hr','placements','community','finance','admissions','procurement',
                     'visitors','marketing','admin')
  AND NOT EXISTS (SELECT 1 FROM role_permissions rp WHERE rp.role_id = r.id AND rp.permission_id = p.id);

-- instructor: course authoring + assessment/attendance
INSERT INTO role_permissions (id, role_id, permission_id, created_at)
SELECT lower(hex(randomblob(12))), r.id, p.id, unixepoch()
FROM roles r, permissions p
WHERE r.slug = 'instructor'
  AND ((p.resource = 'courses' AND p.action IN ('create','update'))
    OR (p.resource = 'certificates' AND p.action = 'create')
    OR (p.resource = 'attendance' AND p.action = 'create')
    OR (p.resource = 'assignments')
    OR (p.resource = 'assessments'))
  AND NOT EXISTS (SELECT 1 FROM role_permissions rp WHERE rp.role_id = r.id AND rp.permission_id = p.id);

-- ---------------------------------------------------------------------------
-- Bootstrap administrator account.
-- ---------------------------------------------------------------------------
INSERT INTO users (id, email, email_verified, password_hash, first_name, last_name, status, created_at, updated_at)
SELECT 'admin00000000000000000000', 'admin@cea.academy', 1,
       'pbkdf2:sha256:30000:bQXA8aqFQKJiMrPhup8EQA==:duAfbyagAYkeCVKgug169/6YwYJFZRh9orWwzZcUHvk=',
       'Admin', 'Academy', 'active', unixepoch(), unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@cea.academy');

INSERT INTO user_roles (id, user_id, role_id, scope_type, is_active, created_at)
SELECT lower(hex(randomblob(12))), u.id, r.id, 'global', 1, unixepoch()
FROM users u, roles r
WHERE u.email = 'admin@cea.academy' AND r.slug = 'admin'
  AND NOT EXISTS (SELECT 1 FROM user_roles ur WHERE ur.user_id = u.id AND ur.role_id = r.id);

-- ---------------------------------------------------------------------------
-- Seed program catalog (codes match the slugs used by the public apply page).
-- ---------------------------------------------------------------------------
INSERT INTO programs (id, code, name, description, duration, credential_type, level, price, currency, status, created_at, updated_at)
SELECT 'prog-fullstack', 'full-stack-web-development', 'Full-Stack Web Development',
       'Master HTML, CSS, JavaScript, React, Node.js, and databases.', '12 weeks', 'certificate', 'beginner', 45000, 'NGN', 'active', unixepoch(), unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM programs WHERE code = 'full-stack-web-development');

INSERT INTO programs (id, code, name, description, duration, credential_type, level, price, currency, status, created_at, updated_at)
SELECT 'prog-data-science', 'python-data-science', 'Python for Data Science',
       'Learn Python, pandas, NumPy, Matplotlib, and machine learning fundamentals.', '10 weeks', 'certificate', 'beginner', 38000, 'NGN', 'active', unixepoch(), unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM programs WHERE code = 'python-data-science');

INSERT INTO programs (id, code, name, description, duration, credential_type, level, price, currency, status, created_at, updated_at)
SELECT 'prog-cyber', 'cybersecurity-essentials', 'Cyber Security Essentials',
       'Network security, ethical hacking, incident response, and compliance.', '14 weeks', 'certificate', 'intermediate', 52000, 'NGN', 'active', unixepoch(), unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM programs WHERE code = 'cybersecurity-essentials');

INSERT INTO programs (id, code, name, description, duration, credential_type, level, price, currency, status, created_at, updated_at)
SELECT 'prog-marketing', 'digital-marketing-strategy', 'Digital Marketing Strategy',
       'SEO, SEM, social media marketing, content strategy, and analytics.', '8 weeks', 'certificate', 'beginner', 30000, 'NGN', 'active', unixepoch(), unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM programs WHERE code = 'digital-marketing-strategy');

INSERT INTO programs (id, code, name, description, duration, credential_type, level, price, currency, status, created_at, updated_at)
SELECT 'prog-devops', 'cloud-devops', 'Cloud & DevOps Engineering',
       'Cloud, Docker, Kubernetes, CI/CD pipelines, and infrastructure as code.', '12 weeks', 'certificate', 'intermediate', 48000, 'NGN', 'active', unixepoch(), unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM programs WHERE code = 'cloud-devops');

INSERT INTO programs (id, code, name, description, duration, credential_type, level, price, currency, status, created_at, updated_at)
SELECT 'prog-ai', 'ai-machine-learning', 'AI & Machine Learning',
       'Deep learning, NLP, computer vision, and deployment.', '16 weeks', 'certificate', 'advanced', 65000, 'NGN', 'active', unixepoch(), unixepoch()
WHERE NOT EXISTS (SELECT 1 FROM programs WHERE code = 'ai-machine-learning');
