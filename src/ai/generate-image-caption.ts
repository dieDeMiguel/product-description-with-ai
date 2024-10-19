import { openai } from "@/ai";
import { setImageCaption } from "@/db";

const SYSTEM_CONTEXT = (language: string) => `
  You are an expert in generating captions for images in product descriptions for e-commerce platforms.
  Create a detailed, accurate, and engaging caption for the given image in ${language}, following best practices for e-commerce product descriptions.
  Ensure the caption is informative, highlights key features, and is written in a professional tone.
  Include the following details if possible:
  - Title: [A concise and compelling title for the image]
  - Description: [A brief and engaging description of the image, highlighting key features and benefits]
  - Call to Action: [Encourage the customer to take action, such as "Buy Now" or "Learn More"]
  Avoid using overly promotional language or making unsupported claims.
  Ensure the caption is clear, concise, and free of grammatical errors.
`;

export async function generateImageCaption(
  id: number,
  url: string,
  language: string
): Promise<string> {
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
