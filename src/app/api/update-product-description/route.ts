import { setProductDescription } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { id, value } = await request.json();

    if (!id || !value) {
      return NextResponse.json(
        { message: "Missing required parameters" },
        { status: 400 }
      );
    }

    await setProductDescription(id, value);
    return NextResponse.json(
      { message: "Field updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PUT /api/update-press-release-field:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
