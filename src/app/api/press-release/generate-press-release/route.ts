import { setGeneratedPressRelease } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { pressRelease } = await request.json();

    const id = await setGeneratedPressRelease(pressRelease);
    console.log(`Generated press release route.ts with ID: ${id}`);

    return NextResponse.json({ id }, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/generate-press-release:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
