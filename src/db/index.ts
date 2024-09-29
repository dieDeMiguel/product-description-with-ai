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
  await sql`UPDATE pressReleases SET pressRelease=${pressRelease} WHERE id=${id}`;
}

export async function setPressReleaseCompleted(
  id: number,
  pressRelease: boolean
): Promise<void> {
  await sql`UPDATE pressReleases SET pressRelease_completed=${pressRelease} WHERE id=${id}`;
}

export async function getGeneratedPressRelease(
  id: number
): Promise<PressRelease | null> {
  const result = await sql`SELECT * FROM pressReleases WHERE id = ${id}`;
  return result.rows[0] as PressRelease | null;
}

export async function setGeneratedPressRelease(
  pressRelease: string
): Promise<number> {
  const result =
    await sql`INSERT INTO pressReleases (pressRelease) VALUES (${pressRelease}) RETURNING id`;
  return result.rows[0].id;
}
