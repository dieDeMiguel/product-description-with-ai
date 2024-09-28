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
