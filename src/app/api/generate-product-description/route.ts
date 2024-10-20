"use server";
import { openai } from "@/ai";
import EditorBlocksSchema from "@/schemas/product-description-schema";
import { openai as vercelAi } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import "server-only";

const SYSTEM_CONTEXT = (language: string) => `
  You are a product description generator. Create a well-structured, informative, and engaging product description in ${language} based on the given prompt.
  Write in a professional tone, demonstrating strong command of language and knowledge of e-commerce trends.
  Only include the body of the product description. Use an h1 tag for the main title as the first line, and include additional titles with h2 tags.`;

const MAX_TOKENS = 1200;

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const prompt = data?.userInput;
    if (!prompt) {
      return NextResponse.json(
        { error: "Missing prompt in request body" },
        { status: 400 }
      );
    }
    let detectedLanguage: string;
    try {
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
    const result = await streamObject({
      model: vercelAi("gpt-4-turbo"),
      schema: EditorBlocksSchema,
      system: SYSTEM_CONTEXT(detectedLanguage),
      prompt: prompt,
      maxTokens: MAX_TOKENS,
    });
    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error in POST /api/generate-product-description:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
