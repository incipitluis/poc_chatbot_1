import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const appointmentTable = pgTable('appointment_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  appointmentDate: timestamp('appointment_date').notNull(),
  appointmentTime: text('appointment_time').notNull(),
});

export const userTable = pgTable('user_table', {
  id: serial('id').primaryKey(),
  clerkUserId: text('clerk_user_id').notNull().unique(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});



export type InsertAppointment = typeof appointmentTable.$inferInsert;
export type SelectAppointment = typeof appointmentTable.$inferSelect;
export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;
