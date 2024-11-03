"use server";

import { ProductDescriptionAsset, setProductTags } from "@/db";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

const SYSTEM_CONTEXT_KEYWORD_EXTRACTION = `You are a keyword extraction expert for e-commerce product descriptions.
Your job is to read a product description and extract relevant tags from it.
You should ensure that the tags are accurate, relevant, and representative of the main features and benefits of the product.
You have a strong command of language and are familiar with best practices in the e-commerce industry.
Avoid extracting common words, filler words, or irrelevant information.
Only extract tags that are significant and add value to the understanding of the product.
Provide tags separated by a comma. Format: "Tags: tag1, tag2, tag3"`;

export async function generateProductTags(
  productDescriptionEntry: ProductDescriptionAsset
): Promise<void> {
  const uuid = productDescriptionEntry.uuid;
  const prompt = productDescriptionEntry.description;

  try {
    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt: `${SYSTEM_CONTEXT_KEYWORD_EXTRACTION} ${prompt}`,
    });
    const tagsPart = text.split("Tags:")[1];
    if (!tagsPart) {
      throw new Error("Failed to extract tags from the response");
    }
    const tags = tagsPart.split(",").map((tag) => tag.trim());
    await setProductTags(uuid, tags.join(","));
  } catch (error) {
    console.error("Error generating tags:", error);
    throw error;
  }
}
