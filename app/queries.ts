'use server';

import { db } from './db';
import { InsertAppointment, appointmentTable, InsertUser, userTable, SelectUserAppointment, InsertUserAppointment, userAppointmentTable } from './schema';
import { eq, and } from 'drizzle-orm';

export async function createAppointment(data: InsertAppointment) {
  const existingAppointment = await db.select().from(appointmentTable)

    .where(and(
      eq(appointmentTable.appointmentDate, data.appointmentDate),
      eq(appointmentTable.appointmentTime, data.appointmentTime)
    ));

  if (existingAppointment.length > 0) {
    throw new Error('This appointment slot is already taken.');
  }

  await db.insert(appointmentTable).values(data);

  const userAppointment = await getUserAppointmentByEmail(data.email)
  
  if (userAppointment) {
    await createUserAppointment(userAppointment)
  }
  
  
}

export async function getAppointmentsByDate(date: Date) {
  return await db.select().from(appointmentTable)
    .where(eq(appointmentTable.appointmentDate, date));
}

export async function createUser(data: InsertUser) {
  const existingUser = await db.select().from(userTable)
    .where(eq(userTable.clerkUserId, data.clerkUserId));

  if (existingUser.length > 0) {
    throw new Error('User already exists.');
  }

  await db.insert(userTable).values(data);
}

export async function getUserAppointmentByEmail(email: string): Promise<SelectUserAppointment | null> {
  const result = await db
    .select({
      clerkUserId: userTable.clerkUserId,
      firstName: userTable.firstName,
      lastName: userTable.lastName,
      email: appointmentTable.email,
      phone: appointmentTable.phone,
      appointmentDate: appointmentTable.appointmentDate,
      appointmentTime: appointmentTable.appointmentTime,
    })
    .from(userTable)
    .innerJoin(appointmentTable, eq(userTable.email, appointmentTable.email))
    .where(eq(userTable.email, email))
    .limit(1);

  if (result.length > 0) {
    return result[0];
  } else {
    return null;
  }
}

export async function createUserAppointment(data: InsertUserAppointment) {

const userAppointment = await getUserAppointmentByEmail(data.email)

if (!userAppointment) {
  throw new Error('No user appointment has been created');
} 
await db.insert(userAppointmentTable).values(data);
}