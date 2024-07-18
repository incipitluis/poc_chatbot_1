CREATE TABLE IF NOT EXISTS "user_appointment_table" (
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"clerk_user_id" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"appointment_date" timestamp NOT NULL,
	"appointment_time" text NOT NULL,
	CONSTRAINT "user_appointment_table_clerk_user_id_unique" UNIQUE("clerk_user_id")
);
