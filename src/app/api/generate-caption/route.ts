import { generateImageCaption } from "@/ai/generate-image-caption";
import { setImageCaption } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { uuid, imageUrl, language } = await request.json();

    const caption = await generateImageCaption(uuid, imageUrl, language);
    await setImageCaption(uuid, caption);

    return NextResponse.json({ caption }, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/generate-caption:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
