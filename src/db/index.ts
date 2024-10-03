"use server";

import { sql } from "@vercel/postgres";

export type PressReleaseAsset = {
  id: number;
  pressrelease_body: string;
  keywords: string;
  title: string;
  image_url: string;
  image_caption: string;
};

export async function setPressRelease(
  id: number,
  pressRelease: string
): Promise<void> {
  await sql`UPDATE pressreleases_assets SET pressrelease_body=${pressRelease} WHERE id=${id}`;
}

export async function getGeneratedPressRelease(
  id: number
): Promise<PressReleaseAsset> {
  try {
    const result = await sql`SELECT * FROM pressreleases_assets WHERE id=${id}`;
    if (result.rows.length === 0) {
      throw new Error(`No press release found with id ${id}`);
    }
    const pressReleaseAsset = result.rows[0] as PressReleaseAsset;
    return pressReleaseAsset;
  } catch (error) {
    console.error("Error fetching press release:", error);
    throw error;
  }
}

export async function createPressRelease(
  pressRelease: string
): Promise<PressReleaseAsset> {
  const result =
    await sql`INSERT INTO pressreleases_assets (pressrelease_body) VALUES (${pressRelease}) RETURNING *`;
  return result.rows[0] as PressReleaseAsset;
}

export async function setKeywords(id: number, keywords: string): Promise<void> {
  await sql`UPDATE pressreleases_assets SET keywords=${keywords} WHERE id=${id}`;
}

export async function setTitle(id: number, title: string): Promise<void> {
  await sql`UPDATE pressreleases_assets SET title=${title} WHERE id=${id}`;
}

export async function setImageUrl(image: string, id: string): Promise<void> {
  await sql`UPDATE pressreleases_assets SET image_url=${image} WHERE id=${id}`;
}

export async function setImageCaption(
  id: number,
  caption: string
): Promise<void> {
  await sql`UPDATE pressreleases_assets SET image_caption=${caption} WHERE id=${id}`;
}

export async function updatePressReleaseField(
  id: number,
  field: "title" | "pressrelease_body",
  value: string
): Promise<void> {
  if (field === "title") {
    await sql`UPDATE pressreleases_assets SET title=${value} WHERE id=${id}`;
  } else if (field === "pressrelease_body") {
    await sql`UPDATE pressreleases_assets SET pressrelease_body=${value} WHERE id=${id}`;
  } else {
    throw new Error("Invalid field specified");
  }
}

export async function setLanguage(id: number, language: string): Promise<void> {
  await sql`UPDATE pressreleases_assets SET language=${language} WHERE id=${id}`;
}
