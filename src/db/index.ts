"use server";

import { sql } from "@vercel/postgres";

export type PressRelease = {
  id: number;
  pressrelease: string;
  pressrelease_completed: boolean;
};

export async function setPressRelease(
  id: number,
  pressRelease: string
): Promise<void> {
  await sql`UPDATE pressreleases SET pressrelease=${pressRelease} WHERE id=${id}`;
}

export async function setPressReleaseCompleted(
  id: number,
  pressRelease: boolean
): Promise<void> {
  await sql`UPDATE pressreleases SET pressRelease_completed=${pressRelease} WHERE id=${id}`;
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

export async function getGeneratedKeywords(id: number): Promise<string | null> {
  const result = await sql`SELECT * FROM keywords WHERE id = ${id}`;
  return result.rows[0]?.keywords || null;
}
