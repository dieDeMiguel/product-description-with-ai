import { generateProductDescriptionSetLanguage } from "@/ai/generate-product-description-set-language";
import { ProductDescriptionAsset, setLanguage } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { editorData, language } = await request.json();
  let productDescriptionEntry: ProductDescriptionAsset;
  try {
    productDescriptionEntry = await generateProductDescriptionSetLanguage(
      editorData,
      language
    );
    console.log("Product description entry created:", productDescriptionEntry);
    if (!productDescriptionEntry) {
      throw new Error("Failed to create product description entry");
    }
    await setLanguage(productDescriptionEntry?.id, language);
    return NextResponse.json(productDescriptionEntry);
  } catch (error) {
    console.error("Error creating product description entry:", error);
    throw new Error("Failed to create product description entry");
  }
}
