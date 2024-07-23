ALTER TABLE "appointment_table" ADD COLUMN "appointment_timestamp" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "appointment_table" DROP COLUMN IF EXISTS "appointment_date";--> statement-breakpoint
ALTER TABLE "appointment_table" DROP COLUMN IF EXISTS "appointment_time";--> statement-breakpoint
ALTER TABLE "appointment_table" ADD CONSTRAINT "appointment_table_appointment_timestamp_unique" UNIQUE("appointment_timestamp");