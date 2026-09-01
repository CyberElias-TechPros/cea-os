CREATE TABLE `application_documents` (
	`id` text PRIMARY KEY NOT NULL,
	`application_id` text NOT NULL,
	`type` text NOT NULL,
	`file_name` text NOT NULL,
	`file_url` text NOT NULL,
	`verified` integer DEFAULT false,
	`verified_by_id` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`application_id`) REFERENCES `applications`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`verified_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `applications` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`program_id` text,
	`status` text DEFAULT 'draft',
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`date_of_birth` text,
	`address` text,
	`education_level` text,
	`previous_school` text,
	`motivation` text,
	`notes` text,
	`assigned_to_id` text,
	`submitted_at` text,
	`decision_at` text,
	`decided_by_id` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`deleted_at` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`program_id`) REFERENCES `programs`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`assigned_to_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`decided_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `offers` (
	`id` text PRIMARY KEY NOT NULL,
	`application_id` text NOT NULL,
	`program_id` text,
	`status` text DEFAULT 'draft',
	`tuition_fee` real,
	`scholarship_amount` real DEFAULT 0,
	`valid_until` text,
	`notes` text,
	`sent_at` text,
	`responded_at` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`application_id`) REFERENCES `applications`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`program_id`) REFERENCES `programs`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `alumni_profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`current_employer` text,
	`current_position` text,
	`industry` text,
	`graduation_year` integer,
	`linkedin_url` text,
	`github_url` text,
	`is_mentor` integer DEFAULT false,
	`mentorship_areas` text,
	`is_visible` integer DEFAULT true,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `alumni_profiles_user_id_unique` ON `alumni_profiles` (`user_id`);--> statement-breakpoint
CREATE TABLE `placements` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`employer_id` text,
	`position` text NOT NULL,
	`placement_date` integer NOT NULL,
	`salary` text,
	`type` text DEFAULT 'job',
	`notes` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`employer_id`) REFERENCES `employers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `assessment_attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`assessment_id` text NOT NULL,
	`user_id` text NOT NULL,
	`attempt` integer DEFAULT 1,
	`status` text DEFAULT 'in_progress',
	`started_at` integer NOT NULL,
	`submitted_at` integer,
	`time_spent` integer,
	`score` real,
	`total_points` real,
	`percentage` real,
	`passed` integer,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`assessment_id`) REFERENCES `assessments`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `assessment_questions` (
	`id` text PRIMARY KEY NOT NULL,
	`assessment_id` text NOT NULL,
	`type` text NOT NULL,
	`question_text` text NOT NULL,
	`options` text,
	`correct_answer` text,
	`points` real DEFAULT 1,
	`order_index` integer DEFAULT 0,
	`difficulty` text DEFAULT 'medium',
	`tags` text,
	`explanation` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`assessment_id`) REFERENCES `assessments`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `assessment_responses` (
	`id` text PRIMARY KEY NOT NULL,
	`attempt_id` text NOT NULL,
	`question_id` text NOT NULL,
	`response` text,
	`is_correct` integer,
	`points_awarded` real,
	`time_spent` integer,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`attempt_id`) REFERENCES `assessment_attempts`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`question_id`) REFERENCES `assessment_questions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `assessments` (
	`id` text PRIMARY KEY NOT NULL,
	`module_id` text NOT NULL,
	`title` text NOT NULL,
	`type` text DEFAULT 'quiz',
	`time_limit` integer,
	`max_attempts` integer DEFAULT 1,
	`shuffle_questions` integer DEFAULT false,
	`shuffle_options` integer DEFAULT false,
	`show_results` integer DEFAULT true,
	`pass_threshold` integer DEFAULT 60,
	`total_points` real DEFAULT 0,
	`weight` real DEFAULT 1,
	`due_date` integer,
	`available_from` integer,
	`available_until` integer,
	`status` text DEFAULT 'draft',
	`created_by_id` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`module_id`) REFERENCES `modules`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`created_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `assignments` (
	`id` text PRIMARY KEY NOT NULL,
	`module_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`type` text DEFAULT 'other',
	`points_possible` real DEFAULT 100,
	`passing_points` real,
	`weight` real DEFAULT 1,
	`due_date` integer,
	`available_from` integer,
	`available_until` integer,
	`submission_type` text DEFAULT 'mixed',
	`allowed_file_types` text,
	`max_file_size` integer,
	`max_attempts` integer DEFAULT 1,
	`is_group_assignment` integer DEFAULT false,
	`rubric` text,
	`late_penalty_percent` real DEFAULT 0,
	`plagiarism_check` integer DEFAULT false,
	`status` text DEFAULT 'draft',
	`created_by_id` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`module_id`) REFERENCES `modules`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`created_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `grades` (
	`id` text PRIMARY KEY NOT NULL,
	`enrollment_id` text NOT NULL,
	`graded_item_id` text NOT NULL,
	`graded_item_type` text NOT NULL,
	`grader_id` text,
	`score` real NOT NULL,
	`points_possible` real NOT NULL,
	`percentage` real,
	`letter_grade` text,
	`feedback` text,
	`is_passing` integer,
	`is_final` integer DEFAULT false,
	`graded_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`enrollment_id`) REFERENCES `enrollments`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`grader_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`assignment_id` text NOT NULL,
	`user_id` text NOT NULL,
	`attempt` integer DEFAULT 1,
	`status` text DEFAULT 'draft',
	`content` text,
	`files` text,
	`text_entry` text,
	`url` text,
	`code_repo_url` text,
	`submitted_at` integer,
	`is_late` integer DEFAULT false,
	`late_minutes` integer,
	`plagiarism_score` real,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`assignment_id`) REFERENCES `assignments`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `attendance_records` (
	`id` text PRIMARY KEY NOT NULL,
	`enrollment_id` text NOT NULL,
	`session_date` integer NOT NULL,
	`status` text NOT NULL,
	`check_in_time` integer,
	`check_out_time` integer,
	`check_in_method` text DEFAULT 'manual',
	`check_in_latitude` real,
	`check_in_longitude` real,
	`late_minutes` integer,
	`marked_by_id` text,
	`reason` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`enrollment_id`) REFERENCES `enrollments`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`marked_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `audit_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`session_id` text,
	`action` text NOT NULL,
	`resource` text NOT NULL,
	`resource_id` text,
	`details` text,
	`ip_address` text,
	`user_agent` text,
	`severity` text DEFAULT 'info',
	`immutable` integer DEFAULT true,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `certificates` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`course_id` text NOT NULL,
	`enrollment_id` text NOT NULL,
	`certificate_number` text NOT NULL,
	`verification_code` text NOT NULL,
	`template` text,
	`issued_at` integer NOT NULL,
	`expires_at` integer,
	`is_verified` integer DEFAULT true,
	`metadata` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`enrollment_id`) REFERENCES `enrollments`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `certificates_certificate_number_unique` ON `certificates` (`certificate_number`);--> statement-breakpoint
CREATE UNIQUE INDEX `certificates_verification_code_unique` ON `certificates` (`verification_code`);--> statement-breakpoint
CREATE TABLE `donations` (
	`id` text PRIMARY KEY NOT NULL,
	`donor_name` text,
	`donor_email` text,
	`amount` real NOT NULL,
	`currency` text DEFAULT 'ZAR',
	`message` text,
	`is_anonymous` integer DEFAULT false,
	`payment_reference` text,
	`status` text DEFAULT 'pending',
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `event_registrations` (
	`id` text PRIMARY KEY NOT NULL,
	`event_id` text NOT NULL,
	`user_id` text NOT NULL,
	`status` text DEFAULT 'registered',
	`checked_in_at` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`type` text DEFAULT 'workshop',
	`format` text DEFAULT 'virtual',
	`start_date` text NOT NULL,
	`end_date` text,
	`location` text,
	`virtual_link` text,
	`cover_image_url` text,
	`max_attendees` integer,
	`organizer_id` text NOT NULL,
	`status` text DEFAULT 'draft',
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`deleted_at` text,
	FOREIGN KEY (`organizer_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `events_slug_unique` ON `events` (`slug`);--> statement-breakpoint
CREATE TABLE `forum_categories` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`order_index` integer DEFAULT 0,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `forum_categories_name_unique` ON `forum_categories` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `forum_categories_slug_unique` ON `forum_categories` (`slug`);--> statement-breakpoint
CREATE TABLE `forum_likes` (
	`id` text PRIMARY KEY NOT NULL,
	`post_id` text NOT NULL,
	`user_id` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`post_id`) REFERENCES `forum_posts`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `forum_posts` (
	`id` text PRIMARY KEY NOT NULL,
	`thread_id` text NOT NULL,
	`user_id` text NOT NULL,
	`content` text NOT NULL,
	`is_solution` integer DEFAULT false,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`thread_id`) REFERENCES `forum_threads`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `forum_threads` (
	`id` text PRIMARY KEY NOT NULL,
	`category_id` text NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`user_id` text NOT NULL,
	`is_pinned` integer DEFAULT false,
	`is_locked` integer DEFAULT false,
	`view_count` integer DEFAULT 0,
	`reply_count` integer DEFAULT 0,
	`last_activity_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`deleted_at` text,
	FOREIGN KEY (`category_id`) REFERENCES `forum_categories`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `group_members` (
	`id` text PRIMARY KEY NOT NULL,
	`group_id` text NOT NULL,
	`user_id` text NOT NULL,
	`role` text DEFAULT 'member',
	`joined_at` text NOT NULL,
	FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `groups` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`cover_image_url` text,
	`type` text DEFAULT 'study',
	`visibility` text DEFAULT 'public',
	`owner_id` text NOT NULL,
	`member_count` integer DEFAULT 1,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`deleted_at` text,
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `groups_slug_unique` ON `groups` (`slug`);--> statement-breakpoint
CREATE TABLE `mentorship_relations` (
	`id` text PRIMARY KEY NOT NULL,
	`mentor_id` text NOT NULL,
	`mentee_id` text NOT NULL,
	`focus_area` text,
	`status` text DEFAULT 'pending',
	`start_date` text,
	`end_date` text,
	`notes` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`mentor_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`mentee_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `partnerships` (
	`id` text PRIMARY KEY NOT NULL,
	`organization_name` text NOT NULL,
	`contact_person` text,
	`email` text,
	`phone` text,
	`type` text DEFAULT 'educational',
	`status` text DEFAULT 'lead',
	`mou_url` text,
	`start_date` text,
	`end_date` text,
	`notes` text,
	`created_by_id` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`deleted_at` text,
	FOREIGN KEY (`created_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `scholarship_applications` (
	`id` text PRIMARY KEY NOT NULL,
	`scholarship_id` text NOT NULL,
	`user_id` text NOT NULL,
	`motivation` text,
	`status` text DEFAULT 'pending',
	`reviewed_by_id` text,
	`reviewed_at` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`scholarship_id`) REFERENCES `scholarships`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`reviewed_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `scholarships` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`fund_amount` real,
	`currency` text DEFAULT 'ZAR',
	`available_slots` integer DEFAULT 1,
	`deadline` text,
	`eligibility_criteria` text,
	`status` text DEFAULT 'active',
	`created_by_id` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`created_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `volunteer_opportunities` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`location` text,
	`skills` text,
	`commitment` text,
	`slots` integer DEFAULT 1,
	`status` text DEFAULT 'open',
	`created_by_id` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`created_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `volunteer_signups` (
	`id` text PRIMARY KEY NOT NULL,
	`opportunity_id` text NOT NULL,
	`user_id` text NOT NULL,
	`status` text DEFAULT 'pending',
	`hours_logged` real DEFAULT 0,
	`feedback` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`opportunity_id`) REFERENCES `volunteer_opportunities`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `contracts` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`contract_number` text NOT NULL,
	`client_id` text,
	`type` text DEFAULT 'service',
	`status` text DEFAULT 'draft',
	`start_date` text,
	`end_date` text,
	`value` real,
	`currency` text DEFAULT 'ZAR',
	`content` text,
	`signed_by_client` integer DEFAULT false,
	`signed_by_us` integer DEFAULT false,
	`signed_at` text,
	`created_by_id` text,
	`notes` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`deleted_at` text,
	FOREIGN KEY (`client_id`) REFERENCES `contacts`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`created_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `contacts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`company` text,
	`title` text,
	`source` text DEFAULT 'website',
	`status` text DEFAULT 'lead',
	`type` text DEFAULT 'prospective_student',
	`notes` text,
	`assigned_to_id` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`deleted_at` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`assigned_to_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `deals` (
	`id` text PRIMARY KEY NOT NULL,
	`contact_id` text NOT NULL,
	`name` text NOT NULL,
	`value` real,
	`currency` text DEFAULT 'ZAR',
	`stage` text DEFAULT 'qualification',
	`probability` integer DEFAULT 0,
	`expected_close_date` text,
	`notes` text,
	`assigned_to_id` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`deleted_at` text,
	FOREIGN KEY (`contact_id`) REFERENCES `contacts`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`assigned_to_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `enrollments` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`course_id` text NOT NULL,
	`type` text DEFAULT 'self_paced',
	`status` text DEFAULT 'active',
	`enrolled_at` integer NOT NULL,
	`started_at` integer,
	`completed_at` integer,
	`progress` integer DEFAULT 0,
	`final_grade` real,
	`passed` integer,
	`certificate_issued` integer DEFAULT false,
	`payment_status` text DEFAULT 'pending',
	`fee_paid` real,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `progress_tracking` (
	`id` text PRIMARY KEY NOT NULL,
	`enrollment_id` text NOT NULL,
	`lesson_id` text,
	`status` text DEFAULT 'not_started',
	`progress` integer DEFAULT 0,
	`time_spent` integer DEFAULT 0,
	`last_accessed_at` integer NOT NULL,
	`completed_at` integer,
	`score` real,
	`attempts` integer DEFAULT 0,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`enrollment_id`) REFERENCES `enrollments`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `room_bookings` (
	`id` text PRIMARY KEY NOT NULL,
	`room_id` text NOT NULL,
	`booker_id` text NOT NULL,
	`title` text NOT NULL,
	`purpose` text,
	`start_time` text NOT NULL,
	`end_time` text NOT NULL,
	`status` text DEFAULT 'pending',
	`created_at` text NOT NULL,
	FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`booker_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `rooms` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`code` text NOT NULL,
	`type` text DEFAULT 'classroom',
	`capacity` integer DEFAULT 1,
	`location` text,
	`amenities` text,
	`status` text DEFAULT 'available',
	`notes` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `rooms_code_unique` ON `rooms` (`code`);--> statement-breakpoint
CREATE TABLE `work_orders` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`category` text DEFAULT 'other',
	`priority` text DEFAULT 'medium',
	`status` text DEFAULT 'open',
	`location` text,
	`reported_by_id` text NOT NULL,
	`assigned_to_id` text,
	`due_date` text,
	`resolved_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`reported_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`assigned_to_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `budgets` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`fiscal_year` text NOT NULL,
	`amount` real NOT NULL,
	`spent` real DEFAULT 0,
	`department` text,
	`notes` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `chart_of_accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`description` text,
	`is_active` integer DEFAULT true,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `chart_of_accounts_code_unique` ON `chart_of_accounts` (`code`);--> statement-breakpoint
CREATE TABLE `expense_claims` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`amount` real NOT NULL,
	`currency` text DEFAULT 'ZAR',
	`category` text DEFAULT 'other',
	`description` text,
	`receipt_url` text,
	`status` text DEFAULT 'pending',
	`approved_by_id` text,
	`approved_at` text,
	`paid_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`approved_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `payroll_runs` (
	`id` text PRIMARY KEY NOT NULL,
	`period` text NOT NULL,
	`status` text DEFAULT 'draft',
	`gross_total` real DEFAULT 0,
	`net_total` real DEFAULT 0,
	`payslip_count` integer DEFAULT 0,
	`processed_by_id` text,
	`approved_by_id` text,
	`approved_at` text,
	`paid_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`processed_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`approved_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `payroll_runs_period_unique` ON `payroll_runs` (`period`);--> statement-breakpoint
CREATE TABLE `payslips` (
	`id` text PRIMARY KEY NOT NULL,
	`run_id` text NOT NULL,
	`employee_id` text NOT NULL,
	`basic_pay` real DEFAULT 0,
	`allowances` real DEFAULT 0,
	`deductions` real DEFAULT 0,
	`gross_pay` real DEFAULT 0,
	`net_pay` real DEFAULT 0,
	`status` text DEFAULT 'pending',
	`paid_at` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`run_id`) REFERENCES `payroll_runs`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`type` text NOT NULL,
	`amount` real NOT NULL,
	`currency` text DEFAULT 'ZAR',
	`description` text,
	`reference` text,
	`category` text DEFAULT 'other',
	`recorded_by_id` text,
	`transaction_date` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `chart_of_accounts`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`recorded_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `branches` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`code` text NOT NULL,
	`address` text,
	`phone` text,
	`email` text,
	`manager_id` text,
	`is_active` integer DEFAULT true,
	`created_at` text NOT NULL,
	FOREIGN KEY (`manager_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `branches_name_unique` ON `branches` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `branches_code_unique` ON `branches` (`code`);--> statement-breakpoint
CREATE TABLE `departments` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`code` text NOT NULL,
	`description` text,
	`head_id` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`head_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `departments_name_unique` ON `departments` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `departments_code_unique` ON `departments` (`code`);--> statement-breakpoint
CREATE TABLE `employees` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`employee_code` text NOT NULL,
	`department_id` text,
	`branch_id` text,
	`position` text,
	`employment_type` text DEFAULT 'full_time',
	`status` text DEFAULT 'active',
	`start_date` text,
	`end_date` text,
	`salary` real,
	`salary_currency` text DEFAULT 'ZAR',
	`emergency_contact` text,
	`emergency_phone` text,
	`notes` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`deleted_at` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`branch_id`) REFERENCES `branches`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `employees_user_id_unique` ON `employees` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `employees_employee_code_unique` ON `employees` (`employee_code`);--> statement-breakpoint
CREATE TABLE `leave_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`employee_id` text NOT NULL,
	`type` text NOT NULL,
	`start_date` text NOT NULL,
	`end_date` text NOT NULL,
	`days` integer NOT NULL,
	`reason` text,
	`status` text DEFAULT 'pending',
	`approved_by_id` text,
	`approved_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`approved_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `performance_reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`employee_id` text NOT NULL,
	`reviewer_id` text NOT NULL,
	`period` text NOT NULL,
	`rating` integer,
	`strengths` text,
	`improvements` text,
	`goals` text,
	`status` text DEFAULT 'draft',
	`submitted_at` text,
	`completed_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`reviewer_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `staff_attendance` (
	`id` text PRIMARY KEY NOT NULL,
	`employee_id` text NOT NULL,
	`date` text NOT NULL,
	`clock_in` text,
	`clock_out` text,
	`status` text DEFAULT 'present',
	`notes` text,
	`marked_by_id` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`marked_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer DEFAULT false,
	`password_hash` text,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`avatar_url` text,
	`phone` text,
	`phone_country_code` text DEFAULT '+27',
	`phone_verified` integer DEFAULT false,
	`two_factor_enabled` integer DEFAULT false,
	`two_factor_secret` text,
	`status` text DEFAULT 'active',
	`last_login_at` integer,
	`last_login_ip` text,
	`login_attempts` integer DEFAULT 0,
	`lockout_until` integer,
	`preferences` text,
	`metadata` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `permissions` (
	`id` text PRIMARY KEY NOT NULL,
	`resource` text NOT NULL,
	`action` text NOT NULL,
	`description` text,
	`conditions` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `role_permissions` (
	`id` text PRIMARY KEY NOT NULL,
	`role_id` text NOT NULL,
	`permission_id` text NOT NULL,
	`constraints` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`hierarchy` integer DEFAULT 0,
	`is_system` integer DEFAULT false,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `roles_name_unique` ON `roles` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `roles_slug_unique` ON `roles` (`slug`);--> statement-breakpoint
CREATE TABLE `user_roles` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`role_id` text NOT NULL,
	`scope_type` text,
	`scope_id` text,
	`assigned_by_id` text,
	`expires_at` integer,
	`is_active` integer DEFAULT true,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`assigned_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`token` text NOT NULL,
	`refresh_token` text NOT NULL,
	`device_info` text,
	`ip_address` text,
	`user_agent` text,
	`is_mfa_verified` integer DEFAULT false,
	`expires_at` integer NOT NULL,
	`refresh_expires_at` integer NOT NULL,
	`last_activity_at` integer NOT NULL,
	`revoked_at` integer,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sessions_token_unique` ON `sessions` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `sessions_refresh_token_unique` ON `sessions` (`refresh_token`);--> statement-breakpoint
CREATE TABLE `visitor_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`id_type` text,
	`id_number` text,
	`organization` text,
	`purpose` text NOT NULL,
	`host_user_id` text,
	`host_name` text,
	`notes` text,
	`status` text DEFAULT 'pending',
	`checked_in_at` integer,
	`checked_out_at` integer,
	`qr_code` text,
	`badge_printed` integer DEFAULT false,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `notification_templates` (
	`id` text PRIMARY KEY NOT NULL,
	`key` text NOT NULL,
	`name` text NOT NULL,
	`channels` text,
	`category` text DEFAULT 'system',
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `notification_templates_key_unique` ON `notification_templates` (`key`);--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`body` text NOT NULL,
	`icon` text,
	`action_url` text,
	`image` text,
	`category` text DEFAULT 'system',
	`channel` text DEFAULT 'in_app',
	`status` text DEFAULT 'unread',
	`priority` text DEFAULT 'medium',
	`template_key` text,
	`template_data` text,
	`sent_at` integer NOT NULL,
	`read_at` integer,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `course_instructors` (
	`id` text PRIMARY KEY NOT NULL,
	`course_id` text NOT NULL,
	`user_id` text NOT NULL,
	`role` text DEFAULT 'primary',
	`is_active` integer DEFAULT true,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` text PRIMARY KEY NOT NULL,
	`program_id` text,
	`code` text NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`category` text,
	`difficulty` text DEFAULT 'beginner',
	`duration_hours` integer,
	`learning_objectives` text,
	`syllabus` text,
	`price` real,
	`currency` text DEFAULT 'ZAR',
	`is_free` integer DEFAULT false,
	`has_certificate` integer DEFAULT true,
	`pass_threshold` integer DEFAULT 60,
	`max_students` integer,
	`thumbnail_url` text,
	`status` text DEFAULT 'draft',
	`created_by_id` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`program_id`) REFERENCES `programs`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`created_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `courses_code_unique` ON `courses` (`code`);--> statement-breakpoint
CREATE UNIQUE INDEX `courses_slug_unique` ON `courses` (`slug`);--> statement-breakpoint
CREATE TABLE `lesson_materials` (
	`id` text PRIMARY KEY NOT NULL,
	`lesson_id` text NOT NULL,
	`type` text NOT NULL,
	`title` text NOT NULL,
	`file_url` text,
	`file_size` integer,
	`mime_type` text,
	`order_index` integer DEFAULT 0,
	`is_required` integer DEFAULT false,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `lessons` (
	`id` text PRIMARY KEY NOT NULL,
	`module_id` text NOT NULL,
	`title` text NOT NULL,
	`content_type` text DEFAULT 'article',
	`video_url` text,
	`article_body` text,
	`embed_url` text,
	`code_lab_config` text,
	`order_index` integer NOT NULL,
	`estimated_duration` integer,
	`is_free_preview` integer DEFAULT false,
	`status` text DEFAULT 'draft',
	`created_by_id` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`module_id`) REFERENCES `modules`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`created_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `modules` (
	`id` text PRIMARY KEY NOT NULL,
	`course_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`order_index` integer NOT NULL,
	`estimated_duration` integer,
	`is_required` integer DEFAULT true,
	`status` text DEFAULT 'draft',
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `programs` (
	`id` text PRIMARY KEY NOT NULL,
	`department_id` text,
	`code` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`duration` text,
	`credential_type` text,
	`level` text,
	`learning_outcomes` text,
	`prerequisites` text,
	`price` real,
	`currency` text DEFAULT 'ZAR',
	`max_students` integer,
	`status` text DEFAULT 'draft',
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `programs_code_unique` ON `programs` (`code`);--> statement-breakpoint
CREATE TABLE `conversation_participants` (
	`id` text PRIMARY KEY NOT NULL,
	`conversation_id` text NOT NULL,
	`user_id` text NOT NULL,
	`last_read_at` integer NOT NULL,
	`is_muted` integer DEFAULT false,
	`joined_at` integer NOT NULL,
	FOREIGN KEY (`conversation_id`) REFERENCES `conversations`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `conversations` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text DEFAULT 'direct',
	`title` text,
	`course_id` text,
	`created_by_id` text,
	`last_message_at` integer,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`created_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`conversation_id` text NOT NULL,
	`sender_id` text NOT NULL,
	`content` text NOT NULL,
	`message_type` text DEFAULT 'text',
	`file_url` text,
	`reply_to_id` text,
	`edited_at` integer,
	`deleted_at` integer,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`conversation_id`) REFERENCES `conversations`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`sender_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `portfolio_projects` (
	`id` text PRIMARY KEY NOT NULL,
	`portfolio_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`technologies` text,
	`image_url` text,
	`live_url` text,
	`repo_url` text,
	`start_date` integer,
	`end_date` integer,
	`is_featured` integer DEFAULT false,
	`order_index` integer DEFAULT 0,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`portfolio_id`) REFERENCES `portfolios`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `portfolios` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`headline` text,
	`bio` text,
	`skills` text,
	`experience` text,
	`education` text,
	`certifications` text,
	`social_links` text,
	`resume_url` text,
	`is_public` integer DEFAULT false,
	`views` integer DEFAULT 0,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `portfolios_user_id_unique` ON `portfolios` (`user_id`);--> statement-breakpoint
CREATE TABLE `employers` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`company_name` text NOT NULL,
	`company_slug` text NOT NULL,
	`company_logo` text,
	`company_website` text,
	`company_size` text,
	`industry` text,
	`location` text,
	`description` text,
	`is_verified` integer DEFAULT false,
	`status` text DEFAULT 'active',
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `employers_user_id_unique` ON `employers` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `employers_company_slug_unique` ON `employers` (`company_slug`);--> statement-breakpoint
CREATE TABLE `freelance_gigs` (
	`id` text PRIMARY KEY NOT NULL,
	`employer_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`skills_required` text,
	`budget` real,
	`budget_currency` text DEFAULT 'ZAR',
	`duration` text,
	`is_remote` integer DEFAULT true,
	`status` text DEFAULT 'open',
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`employer_id`) REFERENCES `employers`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `gig_applications` (
	`id` text PRIMARY KEY NOT NULL,
	`gig_id` text NOT NULL,
	`user_id` text NOT NULL,
	`proposal` text,
	`bid_amount` real,
	`status` text DEFAULT 'submitted',
	`created_at` integer NOT NULL,
	FOREIGN KEY (`gig_id`) REFERENCES `freelance_gigs`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `job_applications` (
	`id` text PRIMARY KEY NOT NULL,
	`job_listing_id` text NOT NULL,
	`user_id` text NOT NULL,
	`cover_letter` text,
	`resume_url` text,
	`portfolio_url` text,
	`status` text DEFAULT 'submitted',
	`match_score` real,
	`notes` text,
	`applied_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`job_listing_id`) REFERENCES `job_listings`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `job_interviews` (
	`id` text PRIMARY KEY NOT NULL,
	`application_id` text NOT NULL,
	`type` text DEFAULT 'video',
	`scheduled_at` integer NOT NULL,
	`duration` integer,
	`meeting_link` text,
	`location` text,
	`status` text DEFAULT 'scheduled',
	`feedback` text,
	`rating` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`application_id`) REFERENCES `job_applications`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `job_listings` (
	`id` text PRIMARY KEY NOT NULL,
	`employer_id` text NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`responsibilities` text,
	`requirements` text,
	`skills_required` text,
	`location` text,
	`is_remote` integer DEFAULT false,
	`salary_min` real,
	`salary_max` real,
	`salary_currency` text DEFAULT 'ZAR',
	`employment_type` text DEFAULT 'full_time',
	`experience_level` text DEFAULT 'entry',
	`applications_count` integer DEFAULT 0,
	`status` text DEFAULT 'draft',
	`posted_at` integer,
	`expires_at` integer,
	`created_by_id` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`employer_id`) REFERENCES `employers`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`created_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `job_listings_slug_unique` ON `job_listings` (`slug`);--> statement-breakpoint
CREATE TABLE `job_offers` (
	`id` text PRIMARY KEY NOT NULL,
	`application_id` text NOT NULL,
	`salary` real,
	`salary_currency` text DEFAULT 'ZAR',
	`employment_type` text DEFAULT 'full_time',
	`start_date` text,
	`notes` text,
	`status` text DEFAULT 'pending',
	`offered_by_id` text,
	`responded_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`application_id`) REFERENCES `job_applications`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`offered_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `milestones` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`due_date` text,
	`status` text DEFAULT 'pending',
	`order_index` integer DEFAULT 0,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `project_tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`status` text DEFAULT 'todo',
	`priority` text DEFAULT 'medium',
	`assignee_id` text,
	`due_date` text,
	`order_index` integer DEFAULT 0,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`deleted_at` text,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`assignee_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `project_team_members` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`user_id` text NOT NULL,
	`role` text DEFAULT 'member',
	`created_at` text NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`client_id` text,
	`status` text DEFAULT 'planning',
	`priority` text DEFAULT 'medium',
	`start_date` text,
	`end_date` text,
	`budget` text,
	`currency` text DEFAULT 'ZAR',
	`manager_id` text,
	`notes` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`deleted_at` text,
	FOREIGN KEY (`client_id`) REFERENCES `contacts`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`manager_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `support_tickets` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`category` text DEFAULT 'general',
	`priority` text DEFAULT 'medium',
	`status` text DEFAULT 'open',
	`requester_id` text NOT NULL,
	`assignee_id` text,
	`sla_deadline` text,
	`resolved_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`deleted_at` text,
	FOREIGN KEY (`requester_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`assignee_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `ticket_messages` (
	`id` text PRIMARY KEY NOT NULL,
	`ticket_id` text NOT NULL,
	`user_id` text NOT NULL,
	`message` text NOT NULL,
	`is_internal` integer DEFAULT false,
	`created_at` text NOT NULL,
	FOREIGN KEY (`ticket_id`) REFERENCES `support_tickets`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `invoice_line_items` (
	`id` text PRIMARY KEY NOT NULL,
	`invoice_id` text NOT NULL,
	`description` text NOT NULL,
	`quantity` real DEFAULT 1,
	`unit_price` real NOT NULL,
	`total` real NOT NULL,
	`type` text DEFAULT 'service',
	FOREIGN KEY (`invoice_id`) REFERENCES `invoices`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `invoices` (
	`id` text PRIMARY KEY NOT NULL,
	`invoice_number` text NOT NULL,
	`client_id` text,
	`contract_id` text,
	`status` text DEFAULT 'draft',
	`subtotal` real NOT NULL,
	`tax_rate` real DEFAULT 0,
	`tax_amount` real DEFAULT 0,
	`discount` real DEFAULT 0,
	`total` real NOT NULL,
	`currency` text DEFAULT 'ZAR',
	`due_date` text,
	`paid_at` text,
	`payment_method` text,
	`payment_reference` text,
	`notes` text,
	`created_by_id` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`deleted_at` text,
	FOREIGN KEY (`client_id`) REFERENCES `contacts`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`contract_id`) REFERENCES `contracts`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`created_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `asset_tracking` (
	`id` text PRIMARY KEY NOT NULL,
	`inventory_item_id` text NOT NULL,
	`asset_tag` text NOT NULL,
	`assigned_to_id` text,
	`status` text DEFAULT 'available',
	`purchase_date` text,
	`purchase_price` real,
	`warranty_expiry` text,
	`notes` text,
	`checked_out_at` text,
	`returned_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`inventory_item_id`) REFERENCES `inventory_items`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`assigned_to_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `asset_tracking_asset_tag_unique` ON `asset_tracking` (`asset_tag`);--> statement-breakpoint
CREATE TABLE `inventory_items` (
	`id` text PRIMARY KEY NOT NULL,
	`sku` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`category` text DEFAULT 'other',
	`quantity` integer DEFAULT 0 NOT NULL,
	`min_quantity` integer DEFAULT 0,
	`unit_price` real,
	`currency` text DEFAULT 'ZAR',
	`location` text,
	`notes` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`deleted_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `inventory_items_sku_unique` ON `inventory_items` (`sku`);--> statement-breakpoint
CREATE TABLE `stock_movements` (
	`id` text PRIMARY KEY NOT NULL,
	`inventory_item_id` text NOT NULL,
	`type` text NOT NULL,
	`quantity` integer NOT NULL,
	`reference` text,
	`notes` text,
	`recorded_by_id` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`inventory_item_id`) REFERENCES `inventory_items`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`recorded_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `purchase_order_items` (
	`id` text PRIMARY KEY NOT NULL,
	`purchase_order_id` text NOT NULL,
	`inventory_item_id` text,
	`description` text NOT NULL,
	`quantity` integer NOT NULL,
	`unit_price` real NOT NULL,
	`total` real NOT NULL,
	`received` integer DEFAULT 0,
	`created_at` text NOT NULL,
	FOREIGN KEY (`purchase_order_id`) REFERENCES `purchase_orders`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`inventory_item_id`) REFERENCES `inventory_items`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `purchase_orders` (
	`id` text PRIMARY KEY NOT NULL,
	`po_number` text NOT NULL,
	`supplier_id` text,
	`status` text DEFAULT 'draft',
	`total_amount` real,
	`currency` text DEFAULT 'ZAR',
	`expected_date` text,
	`notes` text,
	`created_by_id` text,
	`approved_by_id` text,
	`approved_at` text,
	`received_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`deleted_at` text,
	FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`created_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`approved_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `purchase_orders_po_number_unique` ON `purchase_orders` (`po_number`);--> statement-breakpoint
CREATE TABLE `suppliers` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`contact_person` text,
	`email` text,
	`phone` text,
	`address` text,
	`tax_id` text,
	`payment_terms` text,
	`notes` text,
	`status` text DEFAULT 'active',
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`deleted_at` text
);
--> statement-breakpoint
CREATE TABLE `campaigns` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`channel` text DEFAULT 'email',
	`audience` text,
	`subject` text,
	`content` text,
	`status` text DEFAULT 'draft',
	`scheduled_at` text,
	`sent_at` text,
	`sent_count` integer DEFAULT 0,
	`created_by_id` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`created_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `content_calendar` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`type` text DEFAULT 'blog',
	`platform` text DEFAULT 'website',
	`publish_at` text,
	`status` text DEFAULT 'idea',
	`author_id` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `intern_tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`intern_user_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`due_date` text,
	`status` text DEFAULT 'todo',
	`assigned_by_id` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`intern_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`assigned_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `intern_timesheets` (
	`id` text PRIMARY KEY NOT NULL,
	`intern_user_id` text NOT NULL,
	`date` text NOT NULL,
	`hours` real NOT NULL,
	`description` text,
	`status` text DEFAULT 'pending',
	`created_at` text NOT NULL,
	FOREIGN KEY (`intern_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `knowledge_base_articles` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`category` text DEFAULT 'faq',
	`body` text,
	`author_id` text,
	`helpful_count` integer DEFAULT 0,
	`published` integer DEFAULT true,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `newsletter_subscribers` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`first_name` text,
	`source` text DEFAULT 'footer',
	`status` text DEFAULT 'subscribed',
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `newsletter_subscribers_email_unique` ON `newsletter_subscribers` (`email`);--> statement-breakpoint
CREATE TABLE `okrs` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`objective` text,
	`period` text NOT NULL,
	`owner_id` text,
	`metric` text,
	`target` real,
	`current` real DEFAULT 0,
	`status` text DEFAULT 'draft',
	`notes` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `volunteer_hours` (
	`id` text PRIMARY KEY NOT NULL,
	`volunteer_user_id` text NOT NULL,
	`signup_id` text,
	`date` text NOT NULL,
	`hours` real NOT NULL,
	`description` text,
	`status` text DEFAULT 'pending',
	`created_at` text NOT NULL,
	FOREIGN KEY (`volunteer_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`signup_id`) REFERENCES `volunteer_signups`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `ward_links` (
	`id` text PRIMARY KEY NOT NULL,
	`parent_id` text NOT NULL,
	`student_user_id` text NOT NULL,
	`relation` text DEFAULT 'guardian',
	`created_at` text NOT NULL,
	FOREIGN KEY (`parent_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`student_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `webhooks` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`url` text NOT NULL,
	`secret` text,
	`events` text DEFAULT '[]',
	`enabled` integer DEFAULT true,
	`last_delivered_at` text,
	`created_at` text NOT NULL
);
