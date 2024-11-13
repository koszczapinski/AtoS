import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set in environment variables");
}

export const openAIClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
