'use server'

import { db } from './db';
import { InsertAppointment, appointmentTable } from './schema';
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
}

export async function getAppointmentsByDate(date: Date) {
  return await db.select().from(appointmentTable)
    .where(eq(appointmentTable.appointmentDate, date));
}

/* TODO: hacer check en el cuerpo de la función antes del await, 
boollean para checkear si existe registro con la misma fecha (y en caso de que sí devolver error, else hacer) */