import {
  createProductDescription,
  ProductDescriptionAsset,
  setLanguage,
} from "@/db";

export async function generateProductDescriptionSetLanguage(
  productDescription: string,
  detectedLanguage: string
): Promise<ProductDescriptionAsset> {
  let productDescriptionEntry: ProductDescriptionAsset;
  try {
    productDescriptionEntry = await createProductDescription(
      productDescription
    );
    if (!productDescriptionEntry) {
      throw new Error("Failed to create product description entry");
    }
    await setLanguage(productDescriptionEntry?.uuid, detectedLanguage);
    return productDescriptionEntry;
  } catch (error) {
    console.error("Error creating product description entry:", error);
    throw new Error("Failed to create product description entry");
  }
}
