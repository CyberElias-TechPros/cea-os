export interface PermissionDef {
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage' | 'approve';
  description: string;
}

export const permissionCatalog: PermissionDef[] = [
  { resource: 'users', action: 'read', description: 'View users' },
  { resource: 'users', action: 'update', description: 'Edit users' },
  { resource: 'users', action: 'delete', description: 'Deactivate users' },
  { resource: 'courses', action: 'create', description: 'Create courses' },
  { resource: 'courses', action: 'update', description: 'Edit courses and modules' },
  { resource: 'courses', action: 'delete', description: 'Delete courses' },
  { resource: 'certificates', action: 'create', description: 'Issue certificates' },
  { resource: 'attendance', action: 'create', description: 'Mark attendance' },
  { resource: 'assignments', action: 'create', description: 'Create assignments' },
  { resource: 'assignments', action: 'update', description: 'Edit and grade assignments' },
  { resource: 'assignments', action: 'read', description: 'View submissions' },
  { resource: 'inventory', action: 'create', description: 'Add inventory items' },
  { resource: 'inventory', action: 'update', description: 'Edit inventory and movements' },
  { resource: 'inventory', action: 'delete', description: 'Remove inventory' },
  { resource: 'analytics', action: 'read', description: 'View analytics and reports' },
  { resource: 'assessments', action: 'create', description: 'Create assessments' },
  { resource: 'assessments', action: 'update', description: 'Edit assessments and questions' },
  { resource: 'hr', action: 'create', description: 'Add staff records' },
  { resource: 'hr', action: 'update', description: 'Edit staff records and decide leave' },
  { resource: 'placements', action: 'create', description: 'Log placements' },
  { resource: 'community', action: 'create', description: 'Create forum categories and scholarships' },
  { resource: 'finance', action: 'create', description: 'Create accounts and transactions' },
  { resource: 'finance', action: 'update', description: 'Approve expenses and manage budgets' },
  { resource: 'admissions', action: 'create', description: 'Manage admissions and offers' },
  { resource: 'admissions', action: 'read', description: 'View and review applications' },
  { resource: 'admissions', action: 'update', description: 'Update application status and decisions' },
  { resource: 'procurement', action: 'create', description: 'Approve purchase orders' },
  { resource: 'visitors', action: 'read', description: 'View visitor records' },
  { resource: 'visitors', action: 'update', description: 'Check visitors in and out' },
  { resource: 'marketing', action: 'read', description: 'View campaigns and leads' },
  { resource: 'marketing', action: 'create', description: 'Create and send campaigns' },
  { resource: 'marketing', action: 'update', description: 'Edit content calendar' },
  { resource: 'admin', action: 'update', description: 'Manage webhooks and system config' },
];

export const defaultRoles: { name: string; slug: string; description: string; hierarchy: number }[] = [
  { name: 'Administrator', slug: 'admin', description: 'Full platform access', hierarchy: 100 },
  { name: 'Student', slug: 'student', description: 'Enrolled learner', hierarchy: 10 },
  { name: 'Alumni', slug: 'alumni', description: 'Graduated learner', hierarchy: 20 },
  { name: 'Staff', slug: 'staff', description: 'Institute staff member', hierarchy: 50 },
  { name: 'Instructor', slug: 'instructor', description: 'Course instructor', hierarchy: 40 },
  { name: 'Employer', slug: 'employer', description: 'Hiring partner', hierarchy: 30 },
  { name: 'Mentor', slug: 'mentor', description: 'Alumni mentor', hierarchy: 35 },
  { name: 'Supplier', slug: 'supplier', description: 'External supplier portal access', hierarchy: 25 },
  { name: 'Partner', slug: 'partner', description: 'Partner organization portal access', hierarchy: 25 },
  { name: 'Parent', slug: 'parent', description: 'Parent/guardian portal access', hierarchy: 15 },
  { name: 'Volunteer', slug: 'volunteer', description: 'Volunteer portal access', hierarchy: 15 },
  { name: 'Intern', slug: 'intern', description: 'Intern portal access', hierarchy: 15 },
  { name: 'NGO', slug: 'ngo', description: 'NGO partner portal access', hierarchy: 25 },
  { name: 'Government', slug: 'government', description: 'Government compliance portal access', hierarchy: 25 },
];
