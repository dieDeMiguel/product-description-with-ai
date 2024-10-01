import { openai } from "@/ai";
import { setPressRelease, setPressReleaseCompleted } from "@/db";

const SYSTEM_CONTEXT = (language: string) => `
  You are a press release generator.
  Your job is to create a press release based on the given prompt, and the content should be in ${language}.
  Both content and language will be determined by the prompt.
  You should ensure the press release is well-structured, informative, and engaging.
  You have a strong command of language and can write in a professional tone.
  You are very knowledgeable about current events and trends. Avoid adding: "For immediate release",
  [Company Information], Contact: [Name] [Title] [Email] [Phone]. Only send the body of the press release.
  Do not include the title, date, location or other metadata. Do not add hashtags or social media handles.
`;

export async function pressRelease(
  id: string,
  prompt: string
): Promise<string> {
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    throw new Error("Invalid ID: ID must be a number");
  }

  // Detect language
  const languageDetection = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Detect the language of the following text: "${prompt}"`,
      },
    ],
  });

  const detectedLanguage =
    languageDetection.choices[0]?.message?.content?.trim() ?? "unknown";

  // Generate the press release
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: SYSTEM_CONTEXT(detectedLanguage),
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
    await setPressRelease(numericId, pressRelease);
  }
  await setPressReleaseCompleted(numericId, true);
  return pressRelease;
}
