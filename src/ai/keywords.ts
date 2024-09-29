import { openai } from "@/ai";
import { setKeywords, setKeywordsCompleted } from "@/db";

const SYSTEM_CONTEXT_KEYWORD_EXTRACTION = `You are a keyword extraction expert for press releases.
Your job is to read a press release and extract relevant keywords from it.
You should ensure the keywords are accurate, relevant, and representative of the main topics and themes of the press release.
You have a strong command of language and are familiar with best practices in the German press release industry.
Avoid extracting common words, filler words, or irrelevant information.
Only extract keywords that are significant and add value to the understanding of the press release. Give 5-10 comma separated keywords
Avoid listing them and sending any other data rather than the keywords separated with a comma.`;

export async function generateKeywords(
  prompt: string,
  id: string
): Promise<string> {
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    throw new Error("Invalid ID: ID must be a number");
  }
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: SYSTEM_CONTEXT_KEYWORD_EXTRACTION,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 400,
    stream: true,
  });

  let keywords = "";
  for await (const chunk of stream) {
    keywords += chunk.choices[0].delta.content ?? "";
    await setKeywords(numericId, keywords);
  }
  await setKeywordsCompleted(numericId, true);
  return keywords;
}
