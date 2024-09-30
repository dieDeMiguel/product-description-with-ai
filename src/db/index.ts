"use server";

import { sql } from "@vercel/postgres";

export type PressRelease = {
  id: number;
  pressrelease: string;
  pressrelease_completed: boolean;
};

export type Keywords = {
  id: number;
  keywords: string;
  keywords_completed: boolean;
};

export type Images = {
  id: number;
  image: string;
  image_caption: string;
  image_caption_completed: boolean;
};

export async function setPressRelease(
  id: number,
  pressRelease: string
): Promise<void> {
  await sql`UPDATE pressreleases SET pressrelease=${pressRelease} WHERE id=${id}`;
}

export async function setPressReleaseCompleted(
  id: number,
  isPressReleaseGenerationFinished: boolean
): Promise<void> {
  await sql`UPDATE pressreleases SET pressRelease_completed=${isPressReleaseGenerationFinished} WHERE id=${id}`;
}

export async function getGeneratedPressRelease(
  id: number
): Promise<PressRelease | null> {
  const result = await sql`SELECT * FROM pressreleases WHERE id = ${id}`;
  return result.rows[0] as PressRelease | null;
}

export async function setGeneratedPressRelease(
  pressRelease: string
): Promise<number> {
  const result =
    await sql`INSERT INTO pressreleases (pressRelease) VALUES (${pressRelease}) RETURNING id`;
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

export async function addBackground(image: string): Promise<void> {
  await sql`INSERT INTO images (image) VALUES (${image})`;
  const result =
    await sql`SELECT currval(pg_get_serial_sequence('images', 'id'))`;
  return result.rows[0].currval;
}
