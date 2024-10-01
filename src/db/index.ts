"use server";

import { sql } from "@vercel/postgres";

export type PressReleaseAsset = {
  id: number;
  pressrelease: string;
  pressrelease_completed: boolean;
  image: string;
  image_caption: string;
  image_caption_completed: boolean;
  keywords: string;
  keywords_completed: boolean;
};

export async function setPressRelease(
  id: number,
  pressRelease: string
): Promise<void> {
  await sql`UPDATE pressreleases_assets SET pressrelease=${pressRelease} WHERE id=${id}`;
}

export async function setPressReleaseCompleted(
  id: number,
  isPressReleaseGenerationFinished: boolean
): Promise<void> {
  await sql`UPDATE pressreleases_assets SET pressrelease_completed=${isPressReleaseGenerationFinished} WHERE id=${id}`;
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

export async function setGeneratedPressRelease(
  pressRelease: string
): Promise<number> {
  const result =
    await sql`INSERT INTO pressreleases_assets (pressrelease) VALUES (${pressRelease}) RETURNING id`;
  return result.rows[0].id;
}
export async function setKeywords(id: number, keywords: string): Promise<void> {
  await sql`UPDATE pressreleases_assets SET keywords=${keywords} WHERE id=${id}`;
}

export async function getGeneratedKeywords(id: number): Promise<string> {
  try {
    const result =
      await sql`SELECT keywords FROM pressreleases_assets WHERE id=${id}`;
    if (result.rows.length === 0) {
      throw new Error(`No press release found with id ${id}`);
    }
    return result.rows[0].keywords;
  } catch (error) {
    console.error("Error fetching keywords:", error);
    throw error;
  }
}

export async function setKeywordsCompleted(
  id: number,
  isKeywordGenerationFinished: boolean
): Promise<void> {
  await sql`UPDATE pressreleases_assets SET keywords_completed=${isKeywordGenerationFinished} WHERE id=${id}`;
}

export async function upsertImage(image: string, id: string): Promise<void> {
  await sql`UPDATE pressreleases_assets SET image=${image} WHERE id=${id}`;
}

export async function setImageCaption(
  id: number,
  caption: string
): Promise<void> {
  await sql`UPDATE pressreleases_assets SET image_caption=${caption} WHERE id=${id}`;
}

export async function setImageCaptionCompleted(
  id: number,
  captionCompleted: boolean
): Promise<void> {
  await sql`UPDATE pressreleases_assets SET image_caption_completed=${captionCompleted} WHERE id=${id}`;
}
