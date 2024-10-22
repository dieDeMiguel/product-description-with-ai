import { generateProductTags } from "@/ai/generate-product-tags";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { productDescriptionAsset } = await request.json();
    if (!productDescriptionAsset) {
      throw new Error("productDescriptionAsset is undefined");
    }
    await generateProductTags(productDescriptionAsset);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in POST /api/generate-product-tags:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
