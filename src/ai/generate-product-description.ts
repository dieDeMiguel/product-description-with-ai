import { openai } from "@/ai";
import {
  createProductDescription,
  ProductDescriptionAsset,
  setLanguage,
} from "@/db";
import EditorBlocksSchema from "@/schemas/product-description-schema";

import { zodResponseFormat } from "openai/helpers/zod";

const SYSTEM_CONTEXT = (language: string) => `
  You are a product description generator. Create a well-structured, informative, and engaging product description in ${language} based on the given prompt.
  Write in a professional tone, demonstrating strong command of language and knowledge of e-commerce trends.
  Avoid: "For immediate release", [Company Information], Contact details, date, location, metadata, hashtags, and social media handles.
  Only include the body of the product description.
  Use an h1 tag for the main title as the first line, and include additional titles with h2 tags.`;

const MAX_TOKENS = 1200;

export async function generateProductDescription(
  prompt: string
): Promise<ProductDescriptionAsset> {
  let detectedLanguage: string;
  let productDescriptionContent: string;
  try {
    // Detect language
    const languageDetectionResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Detect the language of the following text, return only the language as text: "${prompt}"`,
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
    // Generate the product description
    const productDescriptionResponse = await openai.beta.chat.completions.parse(
      {
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
        response_format: zodResponseFormat(
          EditorBlocksSchema,
          "product_description"
        ),
        max_tokens: MAX_TOKENS,
      }
    );

    productDescriptionContent = JSON.stringify(
      productDescriptionResponse.choices[0].message.parsed
    );
    if (!productDescriptionContent) {
      throw new Error("Failed to generate product description content");
    }
  } catch (error) {
    console.error("Error generating product description:", error);
    throw new Error("Failed to generate product description");
  }

  try {
    const productDescriptionEntry = await createProductDescription(
      productDescriptionContent
    );
    if (!productDescriptionEntry) {
      throw new Error("Failed to create product description entry");
    }
    await setLanguage(productDescriptionEntry?.id, detectedLanguage);
    return productDescriptionEntry;
  } catch (error) {
    console.error("Error creating product description entry:", error);
    throw new Error("Failed to create product description entry");
  }
}
