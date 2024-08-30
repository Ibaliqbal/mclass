ALTER TABLE "submission" ALTER COLUMN "deadline" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "submission" ALTER COLUMN "deadline" SET NOT NULL;