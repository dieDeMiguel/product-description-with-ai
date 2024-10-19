"use server";

import { PressReleaseAsset, setKeywords } from "@/db";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

const SYSTEM_CONTEXT_KEYWORD_EXTRACTION = `You are a keyword extraction expert for press releases.
Your job is to read a press release and extract relevant keywords from it.
You should ensure that the keywords are accurate, relevant, and representative of the main topics and themes of the press release.
You have a strong command of language and are familiar with best practices in the German press release industry.
Avoid extracting common words, filler words, or irrelevant information.
Only extract keywords that are significant and add value to the understanding of the press release.
Provide keywords separated by a comma. Format: "Keywords: [keyword1, keyword2, ...]"`;

export async function generateProductTags(
  pressReleaseEntry: PressReleaseAsset
): Promise<void> {
  const id = pressReleaseEntry.id;
  const prompt = pressReleaseEntry.pressrelease_body;

  try {
    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt: `${SYSTEM_CONTEXT_KEYWORD_EXTRACTION} ${prompt}`,
    });
    const keywordsPart = text.split("Keywords:")[1];
    if (!keywordsPart) {
      throw new Error("Failed to extract keywords from the response");
    }
    const keywords = keywordsPart.split(",").map((keyword) => keyword.trim());
    await setKeywords(id, keywords.join(","));
  } catch (error) {
    console.error("Error generating keywords:", error);
    throw error;
  }
}
