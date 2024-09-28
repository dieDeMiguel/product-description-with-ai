import { pressRelease } from "@/ai/press-release";
import { setGeneratedPressRelease } from "@/store/pressReleaseStore";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || prompt.trim().length < 10) {
      return NextResponse.json(
        { error: "Input is too short." },
        { status: 400 }
      );
    }

    const id = uuid();
    setGeneratedPressRelease(id, "");

    await pressRelease(prompt, id);

    return NextResponse.json({ id }, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/generate-press-release:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
