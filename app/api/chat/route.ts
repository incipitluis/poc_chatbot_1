import { type CoreMessage, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    system: 'You are a helpful assistant.',
    messages,
  });

  return result.toAIStreamResponse();
}












/* import { createOpenAI } from "@ai-sdk/openai";


export const runtime = "edge";

const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
    compatibility: 'strict',
    project: 'artie'
  });

export async function POST(req: Request) {
    const { messages } = await req.json();

    const res = await openai.chat.create({
        model: "gpt-4-turbo-preview",
        stream: true,
        messages,
    });

    const stream = OpenAIStream(res);
}
 */