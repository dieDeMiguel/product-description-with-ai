"use server";
import { openai } from "@/ai";
import { NextRequest, NextResponse } from "next/server";
import "server-only";

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
      return NextResponse.json({ detectedLanguage });
    } catch (error) {
      console.error("Error detecting language:", error);
      throw new Error("Failed to detect language");
    }
  } catch (error) {
    console.error("Error in POST /api/generate-product-description:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
