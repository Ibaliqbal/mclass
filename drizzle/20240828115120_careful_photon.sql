ALTER TYPE "submissionType" ADD VALUE 'presence';--> statement-breakpoint
ALTER TABLE "class" ALTER COLUMN "class_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "class" ALTER COLUMN "room" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "class" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "class" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "submission" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "submission" ALTER COLUMN "description" SET NOT NULL;