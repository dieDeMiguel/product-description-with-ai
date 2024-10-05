import { generateKeywordsAndTitle } from "@/ai/generate-keyywords-title";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { pressRelease } = await request.json();
    const keywords = await generateKeywordsAndTitle(pressRelease);
    return NextResponse.json({ keywords }, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/generate-press-release:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
