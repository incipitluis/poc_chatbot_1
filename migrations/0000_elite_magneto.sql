CREATE TABLE IF NOT EXISTS "appointment_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"appointment_date" timestamp NOT NULL,
	CONSTRAINT "appointment_table_email_unique" UNIQUE("email")
);
