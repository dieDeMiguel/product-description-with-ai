import { openai } from "@/ai";
import { setImageCaption } from "@/db";

export const maxDuration = 30;

const SYSTEM_CONTEXT = (language: string) => `
  You are an expert in generating captions for images in press releases.
  Create a detailed and accurate caption for the given image in ${language}, following press release conventions.
  Include the following details if possible:
  - Title: [Title of the image]
  - Season: [Season information]
  - Person: [Names of persons in the image]
  - Description: [Brief description of the image]
  - Copyright: [Copyright information]
  - Photographer: [Photographer's name]
  - Redactor: [Image editor's name]
  - Filename: [Filename]
  - Rights: [Usage rights and conditions]
  Example in German:
  Bildunterschrift: Die Zeitreise - eine spektakuläre, emotionale Multimedia- und Lichtshow am Schweriner Schloss. Bildrechte: Staatskanzlei MV. Fotograf: Tag der Deutschen Einheit.
`;

export async function generateImageCaption(
  id: number,
  url: string,
  language: string
): Promise<string> {
  // Generate the image caption
  const stream = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      {
        role: "system",
        content: SYSTEM_CONTEXT(language),
      },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url,
            },
          },
        ],
      },
    ],
    max_tokens: 400,
  });

  const caption = stream.choices[0]?.message?.content?.trim() ?? "";
  if (!caption) {
    throw new Error("Failed to generate image caption");
  }
  await setImageCaption(id, caption);
  return caption;
}
