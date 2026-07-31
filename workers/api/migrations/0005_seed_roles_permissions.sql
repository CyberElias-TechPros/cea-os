-- Round 8 seed: new roles + permissions + admin grants
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

INSERT INTO role_permissions (id, role_id, permission_id, created_at)
SELECT lower(hex(randomblob(12))), r.id, p.id, unixepoch()
FROM roles r, permissions p
WHERE r.slug = 'admin'
  AND p.resource IN ('marketing', 'admin')
  AND p.action IN ('read', 'create', 'update', 'manage')
  AND NOT EXISTS (
    SELECT 1 FROM role_permissions rp
    WHERE rp.role_id = r.id AND rp.permission_id = p.id
  );
