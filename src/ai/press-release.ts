import { openai } from "@/ai";
import { setPressRelease, setPressReleaseCompleted } from "@/db";
const SYSTEM_CONTEXT = `You are a press release generator.
Your job is to create a press release based on the given prompt.
You should ensure the press release is well-structured, informative, and engaging.
You have a strong command of language and can write in a professional tone.
You are very knowledgeable about current events and trends.`;

export async function pressRelease(
  id: string,
  prompt: string
): Promise<string> {
  console.log("Press Release function:", id);
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    throw new Error("Invalid ID: ID must be a number");
  }
  const fullPrompt = `${SYSTEM_CONTEXT} ${prompt}`;
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: SYSTEM_CONTEXT,
      },
      {
        role: "user",
        content: fullPrompt,
      },
    ],
    max_tokens: 400,
    stream: true,
  });

  let pressRelease = "";
  for await (const chunk of stream) {
    pressRelease += chunk.choices[0].delta.content ?? "";
    await setPressRelease(numericId, pressRelease);
  }
  await setPressReleaseCompleted(numericId, true);
  return pressRelease;
}
