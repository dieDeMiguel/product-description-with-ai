import { updatePressReleaseField } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { id, field, value } = await request.json();

    if (!id || !field || !value) {
      return NextResponse.json(
        { message: "Missing required parameters" },
        { status: 400 }
      );
    }

    if (field !== "title" && field !== "pressrelease_body") {
      return NextResponse.json(
        { message: "Invalid field specified" },
        { status: 400 }
      );
    }

    await updatePressReleaseField(id, field, value);
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
