import { type CoreMessage, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { getAppointmentsByDateRange } from '@/app/queries';
import generateAvailableSlots from '@/app/lib//chatbot/generate-available-slots';
import { getKeywordResult } from './get-keyword-result';

export const maxDuration = 30;


export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();
  const lastUserMessage = messages[messages.length - 1].content.toString();

 

  const promptForKeywords = `Interpreta el mensaje del usuario. Si está preguntando sobre citas o tratando de concertar una,
                            responde única y exclusivamente "sí". Si no, responde única y exclusivamente "no". Es importante 
                            que no aparezca ninguna otra palabra en tu mensaje. Mensaje del usuario: ${lastUserMessage}`;

  const keywordResult = await getKeywordResult(promptForKeywords, lastUserMessage);



  let prompt = `${lastUserMessage}. Hablas en nombre de InkSpot Tattoo, sé respetuoso y juvenil. Si corresponde, ofrece al usuario ayudarle con las citas, presentándole a nuestros tatuadores o asesorándole respecto al diseño. No te extiendas más de cuarenta palabras.`;

  if (keywordResult === 'sí') {

 
    
    const today = new Date();
    const twoWeeksFromNow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);
    const occupiedAppointments = await getAppointmentsByDateRange(today, twoWeeksFromNow);
    const occupiedSlots = occupiedAppointments.map(appointment => new Date(appointment.appointmentTimestamp));
 

    const availableSlots = generateAvailableSlots(today, twoWeeksFromNow, occupiedSlots);
   

    const appointmentList = availableSlots.map(slot => slot.toLocaleString()).join(', ');
 

    prompt = `${lastUserMessage} Citas disponibles en las próximas dos semanas: ${appointmentList}. 
              Usa un formato abreviado, no enumeres todas las citas. 
              Usa un máximo de cincuenta palabras, y fórmulas del tipo "Tengo todo libre entre x día y x día" + horario, o 
              "El día x sólo me queda libre x hora". Si hay más citas disponibles aparte de las que informes, dilo explícitamente. 
              Si no, di que son las únicas. Añade siempre al final [Contacta con nosotros]`;
  }

 

  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    system: 'You are a helpful assistant.',
    messages: [{ role: 'user', content: prompt }],
  });

  return result.toAIStreamResponse();
}
