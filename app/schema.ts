import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const appointmentTable = pgTable('appointment_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  appointmentDate: timestamp('appointment_date').notNull(),
  appointmentTime: text('appointment_time').notNull(),
});

export type InsertAppointment = typeof appointmentTable.$inferInsert;
export type SelectAppointment = typeof appointmentTable.$inferSelect;
