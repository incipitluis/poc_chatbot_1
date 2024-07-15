CREATE TABLE IF NOT EXISTS "user_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerk_user_id" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_table_clerk_user_id_unique" UNIQUE("clerk_user_id"),
	CONSTRAINT "user_table_email_unique" UNIQUE("email")
);
