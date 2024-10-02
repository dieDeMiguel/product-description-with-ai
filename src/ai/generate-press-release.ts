import { openai } from "@/ai";
import { createPressRelease, PressReleaseAsset } from "@/db";

const SYSTEM_CONTEXT = (language: string) => `
  You are a press release generator.
  Your job is to create a press release based on the given prompt, and the content should be in ${language}.
  Both content and language will be determined by the prompt.
  You should ensure the press release is well-structured, informative, and engaging.
  You have a strong command of language and can write in a professional tone.
  You are very knowledgeable about current events and trends. Avoid adding: "For immediate release",
  [Company Information], Contact: [Name] [Title] [Email] [Phone]. Only send the body of the press release.
  Do not include the title, date, location, or other metadata. Do not add hashtags or social media handles.
`;

export async function generatePressRelease(
  prompt: string
): Promise<PressReleaseAsset> {
  let detectedLanguage: string;
  let pressReleaseContent: string;
  console.log("prompt en generatePressRelease", prompt);
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

  console.log("detectedLanguage en generatePressRelease", detectedLanguage);

  try {
    // Generate the press release
    const pressReleaseResponse = await openai.chat.completions.create({
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
    });

    pressReleaseContent = pressReleaseResponse.choices[0].message.content ?? "";
    if (!pressReleaseContent) {
      throw new Error("Failed to generate press release content");
    }
  } catch (error) {
    console.error("Error generating press release:", error);
    throw new Error("Failed to generate press release");
  }

  try {
    // Create the press release entry in the database
    const pressReleaseEntry = await createPressRelease(pressReleaseContent);
    return pressReleaseEntry;
  } catch (error) {
    console.error("Error creating press release entry:", error);
    throw new Error("Failed to create press release entry");
  }
}
