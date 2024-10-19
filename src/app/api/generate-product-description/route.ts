import { generateProductDescription } from "@/ai/generate-product-description";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    const pressReleaseEntry = await generateProductDescription(prompt);
    return NextResponse.json(
      { pressRelease: pressReleaseEntry },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /api/generate-product-description:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
