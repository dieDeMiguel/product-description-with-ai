"use server";
// import EditorBlocksSchema from "@/schemas/product-description-schema";
import { openai as vercelAi } from "@ai-sdk/openai";
import { smoothStream, streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import "server-only";

const SYSTEM_CONTEXT = (language: string) => `
  You are a product description generator. Create a well-structured, informative, and engaging product description in ${language} based on the given prompt.
  Write in a professional tone, demonstrating strong command of language and knowledge of e-commerce trends.
  Only include the body of the product description. Use an h1 tag for the main title as the first line, and include additional subtitles with h2 tags.
  Example:
  <h1>Main Title</h1>
  <h2>Sub Title 1</h2>
  <p>Paragraph text...</p>
  <h2>Sub Title 2</h2>
  <p>Paragraph text...</p>

  IMPORTANT: Format your response as a JSON string with the following structure:
  {
    "blocks": [
      {
        "id": "unique-id-1",
        "type": "header",
        "data": {
          "text": "Main Title",
          "level": 1
        }
      },
      {
        "id": "unique-id-2",
        "type": "paragraph",
        "data": {
          "text": "Paragraph text..."
        }
      }
    ]
  }
`
const MAX_TOKENS = 1200;

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const prompt = data?.userInput;
    const detectedLanguage = data?.detectedLanguage;
    if (!prompt) {
      return NextResponse.json(
        { error: "Missing prompt in request body" },
        { status: 400 }
      );
    }
    const result = await streamText({
      model: vercelAi("gpt-4-turbo"),
      // schema: EditorBlocksSchema,
      system: SYSTEM_CONTEXT(detectedLanguage),
      prompt: prompt,
      maxTokens: MAX_TOKENS,
      experimental_transform: smoothStream({
        delayInMs: 25, 
        chunking: 'word',
      }),    
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
