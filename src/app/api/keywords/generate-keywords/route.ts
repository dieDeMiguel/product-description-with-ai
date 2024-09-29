import { setGeneratedKeywords } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { keywords } = await request.json();

    const id = await setGeneratedKeywords(keywords);

    return NextResponse.json({ id }, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/generate-press-release:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
