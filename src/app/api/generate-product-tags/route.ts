import { generateProductTags } from "@/ai/generate-product-tags";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { productDescriptionEntry } = await request.json();
    const keywords = await generateProductTags(productDescriptionEntry);
    return NextResponse.json({ keywords }, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/generate-product-tags:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
