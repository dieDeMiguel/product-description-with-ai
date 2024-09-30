"use server";

import { sql } from "@vercel/postgres";

export type PressReleaseImage = {
  id: number;
  pressrelease: string;
  pressrelease_completed: boolean;
  image: string;
  image_caption: string;
  image_caption_completed: boolean;
};

export type Keywords = {
  id: number;
  keywords: string;
  keywords_completed: boolean;
};

export async function setPressRelease(
  id: number,
  pressRelease: string
): Promise<void> {
  await sql`UPDATE pressreleases_images SET pressrelease=${pressRelease} WHERE id=${id}`;
}

export async function setPressReleaseCompleted(
  id: number,
  isPressReleaseGenerationFinished: boolean
): Promise<void> {
  await sql`UPDATE pressreleases_images SET pressRelease_completed=${isPressReleaseGenerationFinished} WHERE id=${id}`;
}

export async function getGeneratedPressRelease(
  id: number
): Promise<PressReleaseImage | null> {
  const result = await sql`SELECT * FROM pressreleases_images WHERE id=${id}`;
  return result.rows[0] as PressReleaseImage | null;
}

export async function setGeneratedPressRelease(
  pressRelease: string
): Promise<number> {
  const result =
    await sql`INSERT INTO pressreleases_images (pressrelease) VALUES (${pressRelease}) RETURNING id`;
  return result.rows[0].id;
}

export async function setKeywords(id: number, keywords: string): Promise<void> {
  await sql`UPDATE keywords SET keywords=${keywords} WHERE id=${id}`;
}

export async function setGeneratedKeywords(keywords: string): Promise<number> {
  const result =
    await sql`INSERT INTO keywords (keywords) VALUES (${keywords}) RETURNING id`;
  return result.rows[0].id;
}

export async function getGeneratedKeywords(
  id: number
): Promise<Keywords | null> {
  const result = await sql`SELECT * FROM keywords WHERE id = ${id}`;
  return result.rows[0]?.keywords as Keywords | null;
}

export async function setKeywordsCompleted(
  id: number,
  isKeywordGenerationFinished: boolean
): Promise<void> {
  await sql`UPDATE keywords SET keywords_completed=${isKeywordGenerationFinished} WHERE id=${id}`;
}

export async function upsertImage(image: string, id: string): Promise<void> {
  await sql`
    INSERT INTO pressreleases_images (id, image)
    VALUES (${id}, ${image})
    ON CONFLICT (id) DO UPDATE SET image = EXCLUDED.image
  `;
}

export async function setImageCaption(
  id: number,
  caption: string
): Promise<void> {
  await sql`UPDATE pressreleases_images SET image_caption=${caption} WHERE id=${id}`;
}

export async function setImageCaptionCompleted(
  id: number,
  captionCompleted: boolean
): Promise<void> {
  await sql`UPDATE pressreleases_images SET image_caption_completed=${captionCompleted} WHERE id=${id}`;
}
