import { setGeneratedKeywords } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { pressRelease } = await request.json();

    const id = await setGeneratedKeywords(pressRelease);

    return NextResponse.json({ id }, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/generate-press-release:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
