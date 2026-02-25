"use server"

import { getAppointmentsByDateRange } from "../queries"

export const fetchUnavailableTimestamps = async () => {
  const today = new Date()
  const oneYearFromNow = new Date(
    today.getFullYear() + 1,
    today.getMonth(),
    today.getDate()
  )
  const appointments = await getAppointmentsByDateRange(today, oneYearFromNow)
  const timestamps = appointments.map(
    (appointment) => new Date(appointment.appointmentTimestamp)
  )
  return timestamps
}
