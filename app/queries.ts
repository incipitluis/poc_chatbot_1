'use server';

import { db } from './db';
import { InsertAppointment, appointmentTable, InsertUser, userTable, } from './schema';
import { eq, between } from 'drizzle-orm';

export async function createAppointment(data: InsertAppointment) {
  try {
    await db.insert(appointmentTable).values(data);
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw new Error('Could not create appointment. Please try again later.');
  }
}


export async function getAppointmentsByDateRange(startDate: Date, endDate: Date) {
  try {
    const appointments = await db.select().from(appointmentTable)
      .where(between(appointmentTable.appointmentTimestamp, startDate, endDate));
    return appointments;
  } catch (error) {
    console.error('Error fetching appointments by date range:', error);
    throw new Error('Could not fetch appointments. Please try again later.');
  }
}

export async function createUser(data: InsertUser) {
  const existingUser = await db.select().from(userTable)
    .where(eq(userTable.clerkUserId, data.clerkUserId));

  if (existingUser.length > 0) {
    throw new Error('User already exists.');
  }

  await db.insert(userTable).values(data);
}

