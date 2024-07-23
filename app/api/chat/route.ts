import { type CoreMessage, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { getAppointmentsByDateRange } from '@/app/queries';
import generateAvailableSlots from '@/app/lib//chatbot/generate-available-slots';
import { shouldIncludeAppointments } from '@/app/lib/chatbot/should-include-appointments';


export const maxDuration = 30;



export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

 
  const lastUserMessage = messages[messages.length - 1].content.toString();
  console.log('Último mensaje del usuario:', lastUserMessage);

  
  let prompt = `${lastUserMessage}. Hablas en nombre de InkSpot Tattoo, dale un toque juvenil, respetuoso y conciso a tus respuestas. No te extiendas más de cincuenta palabras.`;

 
  if (shouldIncludeAppointments(messages[messages.length - 1])) {
    console.log('El usuario ha preguntado sobre citas o fechas.');
    
    
    const today = new Date();
    const twoWeeksFromNow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);
    const occupiedAppointments = await getAppointmentsByDateRange(today, twoWeeksFromNow);
    const occupiedSlots = occupiedAppointments.map(appointment => new Date(appointment.appointmentTimestamp));
    console.log('Citas ocupadas obtenidas:', occupiedSlots);

    
    const availableSlots = generateAvailableSlots(today, twoWeeksFromNow, occupiedSlots);
    console.log('Horarios disponibles generados:', availableSlots);

    
    const appointmentList = availableSlots.map(slot => slot.toLocaleString()).join(', ');
    console.log('Lista de citas formateada:', appointmentList);

    
    prompt = `${lastUserMessage} Citas disponibles en las próximas dos semanas: ${appointmentList}. 
    Usa un formato abreviado, no enumeres todas las citas. 
    Usa un máximo de cincuenta palabras, y fórmulas del tipo "Tengo todo libre entre x día y x día" + horario, o 
    "El día x sólo me queda libre x hora". Si hay más citas disponibles aparte de las que informes, dilo explícitamente. 
    Si no, di que son las únicas. Añade siempre al final [Contacta con nosotros]`;
  }

  console.log('Prompt enviado a OpenAI:', prompt);

  
  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    system: 'You are a helpful assistant.',
    messages: [{ role: 'user', content: prompt }],
  });

  return result.toAIStreamResponse();
}