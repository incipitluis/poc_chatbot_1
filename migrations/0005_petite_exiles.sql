DROP TABLE "user_appointment_table";--> statement-breakpoint
ALTER TABLE "appointment_table" RENAME COLUMN "name" TO "first_name";--> statement-breakpoint
ALTER TABLE "appointment_table" ADD COLUMN "clerk_user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "appointment_table" ADD COLUMN "last_name" text NOT NULL;