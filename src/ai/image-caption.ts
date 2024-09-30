import { openai } from "@/ai";
import { setReview, setReviewCompleted } from "@/db";

const SYSTEM_CONTEXT = `You are an expert in generating captions for images in press releases.
Your job is to create a detailed and accurate caption for the given image, following the conventions of German press releases.
The caption should include the title, season, persons in the image, a brief description, copyright information, photographer's name, image editor's name, filename, and usage rights.
Ensure the caption is well-structured, informative, and adheres to the provided format.

Your response should be a structured caption with the following details (if possible):
- Title: [Title of the image]
- Season: [Season information]
- Person: [Names of persons in the image]
- Description: [Brief description of the image]
- Copyright: [Copyright information]
- Photographer: [Photographer's name]
- Redactor: [Image editor's name]
- Name of the File: [Filename]
- Rights and conditions: [Usage rights and conditions]`;

export async function generateImageCaption(
  imageId: string,
  url: string
): Promise<string> {
  const stream = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      {
        role: "system",
        content: SYSTEM_CONTEXT,
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Rate the composition, lighting, and use of props of the background. Provide reasoning for that recommendation.",
          },
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
    stream: true,
  });

  let review = "";
  for await (const chunk of stream) {
    review += chunk.choices[0].delta.content ?? "";
    await setReview(+imageId, review);
  }
  await setReviewCompleted(+imageId, true);

  return review;
}
