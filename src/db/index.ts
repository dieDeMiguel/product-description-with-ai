"use server";

import { sql } from "@vercel/postgres";

export async function setPressRelease(
  id: number,
  pressRelease: string
): Promise<void> {
  console.log("setting review", id, pressRelease);

  // Check if the entry exists
  const result = await sql`SELECT id FROM pressReleases WHERE id = ${id}`;

  if (result.rows.length > 0) {
    // Entry exists, update it
    await sql`UPDATE pressReleases SET pressRelease = ${pressRelease} WHERE id = ${id}`;
  } else {
    // Entry does not exist, create it
    await sql`INSERT INTO pressReleases (id, pressRelease) VALUES (${id}, ${pressRelease})`;
  }
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
