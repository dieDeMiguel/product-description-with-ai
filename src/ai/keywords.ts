"use server";

import { setKeywords } from "@/db";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

const SYSTEM_CONTEXT_KEYWORD_EXTRACTION = `You are a keyword extraction expert for press releases.
Your job is to read a press release and extract relevant keywords from it.
You should ensure the keywords are accurate, relevant, and representative of the main topics and themes of the press release.
You have a strong command of language and are familiar with best practices in the German press release industry.
Avoid extracting common words, filler words, or irrelevant information.
Only extract keywords that are significant and add value to the understanding of the press release. Give 5-10 comma separated keywords
Avoid listing them and sending any other data rather than the keywords separated with a comma. Press Release:`;

export async function getKeywords(question: string, id: string) {
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    throw new Error(`Invalid id: ${id}`);
  }
  const { text, finishReason, usage } = await generateText({
    model: openai("gpt-3.5-turbo"),
    prompt: `${SYSTEM_CONTEXT_KEYWORD_EXTRACTION} ${question}`,
  });

  setKeywords(numericId, text);

  return { text, finishReason, usage };
}
