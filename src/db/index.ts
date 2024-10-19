"use server";

import { sql } from "@vercel/postgres";

export type ProductDescriptionAsset = {
  id: number;
  description: string;
  language: string;
  tags: string;
};

export async function setProductDescription(
  id: number,
  description: string
): Promise<void> {
  await sql`UPDATE product_descriptions SET description=${description} WHERE id=${id}`;
}

export async function getProductDescription(
  id: number
): Promise<ProductDescriptionAsset> {
  try {
    const result = await sql`SELECT * FROM product_descriptions WHERE id=${id}`;
    if (result.rows.length === 0) {
      throw new Error(`No product description found with id ${id}`);
    }
    const productDescriptionAsset = result.rows[0] as ProductDescriptionAsset;
    return productDescriptionAsset;
  } catch (error) {
    console.error("Error fetching product description:", error);
    throw error;
  }
}

export async function createProductDescription(
  description: string
): Promise<ProductDescriptionAsset> {
  const result =
    await sql`INSERT INTO product_descriptions (description) VALUES (${description}) RETURNING *`;
  return result.rows[0] as ProductDescriptionAsset;
}

export async function setProductTags(id: number, tags: string): Promise<void> {
  await sql`UPDATE product_descriptions SET tags=${tags} WHERE id=${id}`;
}

export async function setLanguage(id: number, language: string): Promise<void> {
  await sql`UPDATE product_descriptions SET language=${language} WHERE id=${id}`;
}
