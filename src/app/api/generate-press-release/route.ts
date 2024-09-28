import { pressRelease } from "@/ai/press-release";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || prompt.trim().length < 10) {
      return NextResponse.json(
        { error: "Input is too short." },
        { status: 400 }
      );
    }

    const generatedText = await pressRelease(prompt);

    return NextResponse.json({ text: generatedText }, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/generate-press-release:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
