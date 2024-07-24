import OpenAI from "openai";
import { type CoreMessage } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getKeywordResult(prompt: CoreMessage | string, message: CoreMessage | string) {
  try {
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: `${prompt} ${message}`,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
console.log({response})
    const keywordResult = response.choices[0].text.trim().toLowerCase();
    console.log({keywordResult})
    return keywordResult;
  } catch (error) {
    console.error("Error al obtener el resultado:", error);
    return null;
  }
}