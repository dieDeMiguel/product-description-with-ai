import { generateImageCaption } from "@/ai/generate-image-caption";
import { setImageCaption } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { id, url, pressReleaseContent } = await request.json();

    if (!id || !url || !pressReleaseContent) {
      return NextResponse.json(
        { error: "Missing 'id', 'url', or 'pressReleaseContent'" },
        { status: 400 }
      );
    }

    const caption = await generateImageCaption(id, url, pressReleaseContent);
    await setImageCaption(id, caption);

    return NextResponse.json({ caption }, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/generate-caption:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
