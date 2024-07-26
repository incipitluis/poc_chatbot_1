export function generateTimeSlots(
  startHour: number,
  endHour: number,
  intervalMinutes: number
): string[] {
  const times: string[] = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += intervalMinutes) {
      const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(
        2,
        "0"
      )}`;
      times.push(time);
    }
  }
  return times;
}
