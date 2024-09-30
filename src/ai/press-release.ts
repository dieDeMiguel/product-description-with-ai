import { openai } from "@/ai";
import { setPressRelease, setPressReleaseCompleted } from "@/db";
const SYSTEM_CONTEXT = `You are a press release generator.
Your job is to create a press release based on the given prompt, both content and language will be determine by the prompt.
You should ensure the press release is well-structured, informative, and engaging.
You have a strong command of language and can write in a professional tone.
You are very knowledgeable about current events and trends. Avoid adding: "For immediate release",
[Company Information], Contact: [Name] [Title] [Email] [Phone] Only send the body of the press release. 
Do not include the title, date, or other metadata. Do not add hashtags or social media handles.`;

export async function pressRelease(
  id: string,
  prompt: string
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
        content: SYSTEM_CONTEXT,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 400,
    stream: true,
  });

  let pressRelease = "";
  for await (const chunk of stream) {
    pressRelease += chunk.choices[0].delta.content ?? "";
    const test = await setPressRelease(numericId, pressRelease);
    console.log("test 76543214567896543256789", test);
  }
  await setPressReleaseCompleted(numericId, true);
  return pressRelease;
}
