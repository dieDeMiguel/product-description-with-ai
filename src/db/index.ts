"use server";

import { sql } from "@vercel/postgres";

export async function setPressRelease(
  id: number,
  pressRelease: string
): Promise<void> {
  console.log("setting review", id, pressRelease);
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
): Promise<string | null> {
  const result =
    await sql`SELECT pressRelease FROM pressReleases WHERE id = ${id}`;
  return result.rows.length > 0 ? result.rows[0].pressRelease : null;
}
export async function setGeneratedPressRelease(id: number): Promise<void> {
  const result = await sql`SELECT id FROM pressReleases WHERE id = ${id}`;
  if (result.rows.length === 0) {
    await sql`INSERT INTO pressReleases (id, pressRelease) VALUES (${id}, '')`;
  }
}
