import { useState, useTransition, useEffect } from "react";
import { getAppointmentsByDateRange } from "@/app/queries";

export function useUnavailableTimestamps() {
  const [unavailableTimestamps, setUnavailableTimestamps] = useState<Date[]>(
    []
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const today = new Date();
      const oneYearFromNow = new Date(
        today.getFullYear() + 1,
        today.getMonth(),
        today.getDate()
      );
      const appointments = await getAppointmentsByDateRange(
        today,
        oneYearFromNow
      );
      const timestamps = appointments.map(
        (appointment) => new Date(appointment.appointmentTimestamp)
      );
      setUnavailableTimestamps(timestamps);
    });
  }, []);

  return { unavailableTimestamps, isPending };
}
