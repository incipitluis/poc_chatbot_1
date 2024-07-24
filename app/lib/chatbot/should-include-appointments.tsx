import { type CoreMessage, streamText } from "ai";

export function shouldIncludeAppointments(keywordCheck: CoreMessage): boolean {
  const keywords = [
    "citas",
    "cita",
    "cuándo",
    "fecha",
    "disponibilidad",
    "agenda",
    "appointment",
    "date",
    "when",
    "availability",
    "schedule",
  ];
  return keywords.some((keyword) =>
    keywordCheck.content.toString().toLowerCase().includes(keyword)
  );
}
