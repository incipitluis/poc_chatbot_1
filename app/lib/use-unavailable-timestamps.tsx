'use client'

import { useEffect, useState } from "react";
import { getAppointmentsByDateRange } from "@/app/queries";

export function useUnavailableTimestamps() {
  const [unavailableTimestamps, setUnavailableTimestamps] = useState<Date[]>([]);

  useEffect(() => {
    async function fetchUnavailableTimestamps() {
      const today = new Date();
      const oneYearFromNow = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
      const appointments = await getAppointmentsByDateRange(today, oneYearFromNow);
      const timestamps = appointments.map(
        (appointment) => new Date(appointment.appointmentTimestamp)
      );
      setUnavailableTimestamps(timestamps);
    }
    fetchUnavailableTimestamps();
  }, []);

  return unavailableTimestamps;
}
