import { type CoreMessage, streamText } from 'ai';

export function shouldIncludeAppointments(lastMessage: CoreMessage): boolean {
    const keywords = ['citas', 'cuándo', 'fecha', 'disponibilidad', 'agenda', 'appointment', 'date', 'when', 'availability', 'schedule'];
    return keywords.some(keyword => lastMessage.content.toString().toLowerCase().includes(keyword));
  }
  