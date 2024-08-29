DO $$ BEGIN
 CREATE TYPE "public"."submissionType" AS ENUM('material', 'task', 'test');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."userRole" AS ENUM('Student', 'Teacher');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "class" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"class_name" varchar(255),
	"code" varchar(255),
	"instructor_id" uuid NOT NULL,
	"header_photo" varchar(255),
	"room" varchar(255),
	"Subject" text,
	"students" uuid[] DEFAULT ARRAY[]::uuid[] NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "class_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "done_task" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"files" jsonb[] DEFAULT ARRAY[]::jsonb[],
	"submission_id" uuid NOT NULL,
	"student_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "submission" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"class_id" uuid NOT NULL,
	"title" varchar,
	"description" varchar,
	"files" jsonb[] DEFAULT ARRAY[]::jsonb[],
	"deadline" timestamp,
	"submissionType" "submissionType" DEFAULT 'material' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255),
	"email" varchar(255),
	"password" varchar(255),
	"nisn" bigint,
	"avatar" varchar(255),
	"userRole" "userRole" DEFAULT 'Student' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "class" ADD CONSTRAINT "class_instructor_id_users_id_fk" FOREIGN KEY ("instructor_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "done_task" ADD CONSTRAINT "done_task_submission_id_submission_id_fk" FOREIGN KEY ("submission_id") REFERENCES "public"."submission"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "done_task" ADD CONSTRAINT "done_task_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "submission" ADD CONSTRAINT "submission_class_id_class_id_fk" FOREIGN KEY ("class_id") REFERENCES "public"."class"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idClassIndex" ON "class" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "codeIndex" ON "class" USING btree ("code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idDoneTaskIndex" ON "done_task" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "submissionIdIndex" ON "done_task" USING btree ("submission_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "studentIdIndex" ON "done_task" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idSubmissionIndex" ON "submission" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "classIdIndex" ON "submission" USING btree ("class_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "typeIndex" ON "submission" USING btree ("submissionType");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idUserIndex" ON "users" USING btree ("id");