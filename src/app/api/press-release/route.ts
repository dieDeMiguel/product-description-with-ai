import { generateKeywordsAndTitle } from "@/ai/generate-keyywords-title";
import { generatePressRelease } from "@/ai/generate-press-release";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    const pressReleaseEntry = await generatePressRelease(prompt);
    await Promise.all([generateKeywordsAndTitle(pressReleaseEntry)]);
    return NextResponse.json({ id: pressReleaseEntry.id }, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/generate-press-release:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
