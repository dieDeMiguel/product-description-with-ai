"use server";

import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from "uuid";

export type ProductDescriptionAsset = {
  id: number;
  uuid: string;
  description: string;
  language: string;
  tags: string;
  image_url: string;
  image_caption: string;
};

export async function setProductDescription(
  uuid: string,
  description: string
): Promise<void> {
  await sql`UPDATE productdescription_assets SET description=${description} WHERE uuid=${uuid}`;
}

export async function getProductDescription(
  uuid: string
): Promise<ProductDescriptionAsset> {
  try {
    const result =
      await sql`SELECT * FROM productdescription_assets WHERE uuid=${uuid}`;
    if (result.rows.length === 0) {
      throw new Error(`No product description found with uuid ${uuid}`);
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
  const uuid = uuidv4();
  const result =
    await sql`INSERT INTO productdescription_assets (uuid, description) VALUES (${uuid}, ${description}) RETURNING *`;
  return result.rows[0] as ProductDescriptionAsset;
}

export async function setProductTags(
  uuid: string,
  tags: string
): Promise<void> {
  await sql`UPDATE productdescription_assets SET tags=${tags} WHERE uuid=${uuid}`;
}

export async function setLanguage(
  uuid: string,
  language: string
): Promise<void> {
  await sql`UPDATE productdescription_assets SET language=${language} WHERE uuid=${uuid}`;
}

export async function setImageUrl(image: string, uuid: string): Promise<void> {
  await sql`UPDATE productdescription_assets SET image_url=${image} WHERE uuid=${uuid}`;
}

export async function setImageCaption(
  uuid: string,
  caption: string
): Promise<void> {
  await sql`UPDATE productdescription_assets SET image_caption=${caption} WHERE uuid=${uuid}`;
}
