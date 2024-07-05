ALTER TABLE "appointment_table" DROP CONSTRAINT "appointment_table_email_unique";--> statement-breakpoint
ALTER TABLE "appointment_table" ADD COLUMN "appointment_time" text NOT NULL;