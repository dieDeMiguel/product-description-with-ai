import { getGeneratedPressRelease } from "@/store/pressReleaseStore";
import { NextRequest, NextResponse } from "next/server";

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

    // Retrieve the generated press release from the store
    const text = getGeneratedPressRelease(id);

    if (!text) {
      return NextResponse.json(
        { error: "Press release not found or not yet generated." },
        { status: 404 }
      );
    }

    return NextResponse.json({ text }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/get-press-release:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
