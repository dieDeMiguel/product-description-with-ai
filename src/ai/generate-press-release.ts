import { openai } from "@/ai";
import { createPressRelease, PressReleaseAsset, setLanguage } from "@/db";
import EditorBlocksSchema from "@/schemas/press-release-schema";
import { zodResponseFormat } from "openai/helpers/zod";

const SYSTEM_CONTEXT = (language: string) => `
  You are a press release generator. Create a well-structured, informative, and engaging press release in ${language} based on the given prompt.
  Write in a professional tone, demonstrating strong command of language and knowledge of current events and trends.
  Avoid: "For immediate release", [Company Information], Contact details, date, location, metadata, hashtags, and social media handles.
  Only include the body of the press release.
  Use an h1 tag for the main title as the first line, and include additional titles with h2 tags.`;

const MAX_TOKENS = 1200;

export async function generatePressRelease(
  prompt: string
): Promise<PressReleaseAsset> {
  let detectedLanguage: string;
  let pressReleaseContent: string;
  try {
    // Detect language
    const languageDetectionResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Detect the language of the following text: "${prompt}"`,
        },
      ],
    });

    detectedLanguage =
      languageDetectionResponse.choices[0]?.message?.content?.trim() ??
      "unknown";
  } catch (error) {
    console.error("Error detecting language:", error);
    throw new Error("Failed to detect language");
  }

  try {
    // Generate the press release
    const pressReleaseResponse = await openai.beta.chat.completions.parse({
      model: "gpt-4o",
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
      response_format: zodResponseFormat(EditorBlocksSchema, "press_release"),
      max_tokens: MAX_TOKENS,
    });

    pressReleaseContent = JSON.stringify(
      pressReleaseResponse.choices[0].message.parsed
    );
    if (!pressReleaseContent) {
      throw new Error("Failed to generate press release content");
    }
  } catch (error) {
    console.error("Error generating press release:", error);
    throw new Error("Failed to generate press release");
  }

  try {
    const pressReleaseEntry = await createPressRelease(pressReleaseContent);
    if (!pressReleaseEntry) {
      throw new Error("Failed to create press release entry");
    }
    await setLanguage(pressReleaseEntry?.id, detectedLanguage);
    return pressReleaseEntry;
  } catch (error) {
    console.error("Error creating press release entry:", error);
    throw new Error("Failed to create press release entry");
  }
}
