import {
  createProductDescription,
  ProductDescriptionAsset,
  setLanguage,
} from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { editorData, language } = await request.json();
  const blocks = {
    blocks: editorData,
  };
  let productDescriptionEntry: ProductDescriptionAsset;
  try {
    productDescriptionEntry = await createProductDescription(
      JSON.stringify(blocks)
    );
    if (!productDescriptionEntry) {
      throw new Error("Failed to create product description entry");
    }
    await setLanguage(productDescriptionEntry?.uuid, language);
  } catch (error) {
    console.error("Error creating product description entry:", error);
    throw new Error("Failed to create product description entry");
  }
  return NextResponse.json(productDescriptionEntry);
}
