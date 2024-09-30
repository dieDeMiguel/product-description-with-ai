import { getGeneratedPressRelease } from "@/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles GET requests to fetch the generated press release.
 * @param request - Incoming NextRequest.
 * @returns JSON response with the generated text.
 */

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing identifier." },
        { status: 400 }
      );
    }

    const pressrelease = await getGeneratedPressRelease(Number(id));

    if (!pressrelease) {
      return NextResponse.json(
        { error: "Press release not found or not yet generated." },
        { status: 404 }
      );
    }

    return NextResponse.json({ text: pressrelease }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/get-press-release:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
