import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { users } from './users';
import { modules } from './learning';
import { enrollments } from './enrollments';

export const assignments = sqliteTable('assignments', {
  id: text('id').primaryKey().$defaultFn(createId),
  moduleId: text('module_id').notNull().references(() => modules.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  type: text('type', { enum: ['essay', 'code', 'project', 'presentation', 'report', 'other'] }).default('other'),
  pointsPossible: real('points_possible').default(100),
  passingPoints: real('passing_points'),
  weight: real('weight').default(1),
  dueDate: integer('due_date', { mode: 'timestamp' }),
  availableFrom: integer('available_from', { mode: 'timestamp' }),
  availableUntil: integer('available_until', { mode: 'timestamp' }),
  submissionType: text('submission_type', { enum: ['file', 'text', 'url', 'code_repo', 'mixed'] }).default('mixed'),
  allowedFileTypes: text('allowed_file_types', { mode: 'json' }).$type<string[]>(),
  maxFileSize: integer('max_file_size'),
  maxAttempts: integer('max_attempts').default(1),
  isGroupAssignment: integer('is_group_assignment', { mode: 'boolean' }).default(false),
  rubric: text('rubric', { mode: 'json' }).$type<{ criterion: string; points: number; description: string }[]>(),
  latePenaltyPercent: real('late_penalty_percent').default(0),
  plagiarismCheck: integer('plagiarism_check', { mode: 'boolean' }).default(false),
  status: text('status', { enum: ['draft', 'published', 'closed'] }).default('draft'),
  createdById: text('created_by_id').references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date()),
});

export const submissions = sqliteTable('submissions', {
  id: text('id').primaryKey().$defaultFn(createId),
  assignmentId: text('assignment_id').notNull().references(() => assignments.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  attempt: integer('attempt').default(1),
  status: text('status', { enum: ['draft', 'submitted', 'graded', 'returned'] }).default('draft'),
  content: text('content'),
  files: text('files', { mode: 'json' }).$type<{ name: string; url: string; size: number }[]>(),
  textEntry: text('text_entry'),
  url: text('url'),
  codeRepoUrl: text('code_repo_url'),
  submittedAt: integer('submitted_at', { mode: 'timestamp' }),
  isLate: integer('is_late', { mode: 'boolean' }).default(false),
  lateMinutes: integer('late_minutes'),
  plagiarismScore: real('plagiarism_score'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date()),
});

export const grades = sqliteTable('grades', {
  id: text('id').primaryKey().$defaultFn(createId),
  enrollmentId: text('enrollment_id').notNull().references(() => enrollments.id, { onDelete: 'cascade' }),
  gradedItemId: text('graded_item_id').notNull(),
  gradedItemType: text('graded_item_type', { enum: ['assignment', 'assessment', 'manual'] }).notNull(),
  graderId: text('grader_id').references(() => users.id),
  score: real('score').notNull(),
  pointsPossible: real('points_possible').notNull(),
  percentage: real('percentage'),
  letterGrade: text('letter_grade'),
  feedback: text('feedback'),
  isPassing: integer('is_passing', { mode: 'boolean' }),
  isFinal: integer('is_final', { mode: 'boolean' }).default(false),
  gradedAt: integer('graded_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const assessments = sqliteTable('assessments', {
  id: text('id').primaryKey().$defaultFn(createId),
  moduleId: text('module_id').notNull().references(() => modules.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  type: text('type', { enum: ['quiz', 'exam', 'midterm', 'final', 'practice'] }).default('quiz'),
  timeLimit: integer('time_limit'),
  maxAttempts: integer('max_attempts').default(1),
  shuffleQuestions: integer('shuffle_questions', { mode: 'boolean' }).default(false),
  shuffleOptions: integer('shuffle_options', { mode: 'boolean' }).default(false),
  showResults: integer('show_results', { mode: 'boolean' }).default(true),
  passThreshold: integer('pass_threshold').default(60),
  totalPoints: real('total_points').default(0),
  weight: real('weight').default(1),
  dueDate: integer('due_date', { mode: 'timestamp' }),
  availableFrom: integer('available_from', { mode: 'timestamp' }),
  availableUntil: integer('available_until', { mode: 'timestamp' }),
  status: text('status', { enum: ['draft', 'published', 'closed'] }).default('draft'),
  createdById: text('created_by_id').references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()).$onUpdateFn(() => new Date()),
});

export const assessmentQuestions = sqliteTable('assessment_questions', {
  id: text('id').primaryKey().$defaultFn(createId),
  assessmentId: text('assessment_id').notNull().references(() => assessments.id, { onDelete: 'cascade' }),
  type: text('type', { enum: ['multiple_choice', 'true_false', 'short_answer', 'essay', 'coding', 'matching'] }).notNull(),
  questionText: text('question_text').notNull(),
  options: text('options', { mode: 'json' }).$type<{ id: string; text: string }[]>(),
  correctAnswer: text('correct_answer'),
  points: real('points').default(1),
  orderIndex: integer('order_index').default(0),
  difficulty: text('difficulty', { enum: ['easy', 'medium', 'hard'] }).default('medium'),
  tags: text('tags', { mode: 'json' }).$type<string[]>(),
  explanation: text('explanation'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const assessmentAttempts = sqliteTable('assessment_attempts', {
  id: text('id').primaryKey().$defaultFn(createId),
  assessmentId: text('assessment_id').notNull().references(() => assessments.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  attempt: integer('attempt').default(1),
  status: text('status', { enum: ['in_progress', 'submitted', 'graded', 'timed_out'] }).default('in_progress'),
  startedAt: integer('started_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  submittedAt: integer('submitted_at', { mode: 'timestamp' }),
  timeSpent: integer('time_spent'),
  score: real('score'),
  totalPoints: real('total_points'),
  percentage: real('percentage'),
  passed: integer('passed', { mode: 'boolean' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const assessmentResponses = sqliteTable('assessment_responses', {
  id: text('id').primaryKey().$defaultFn(createId),
  attemptId: text('attempt_id').notNull().references(() => assessmentAttempts.id, { onDelete: 'cascade' }),
  questionId: text('question_id').notNull().references(() => assessmentQuestions.id, { onDelete: 'cascade' }),
  response: text('response', { mode: 'json' }).$type<unknown>(),
  isCorrect: integer('is_correct', { mode: 'boolean' }),
  pointsAwarded: real('points_awarded'),
  timeSpent: integer('time_spent'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export type Assignment = typeof assignments.$inferSelect;
export type Submission = typeof submissions.$inferSelect;
export type Grade = typeof grades.$inferSelect;
export type Assessment = typeof assessments.$inferSelect;
export type AssessmentQuestion = typeof assessmentQuestions.$inferSelect;
export type AssessmentAttempt = typeof assessmentAttempts.$inferSelect;
export type AssessmentResponse = typeof assessmentResponses.$inferSelect;
