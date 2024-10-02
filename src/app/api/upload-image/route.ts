import { handleUploadImage } from "@/app/actions/handle-upload-image";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const id = parseInt(formData.get("id") as string, 10);
    const pressReleaseContent = formData.get("pressReleaseContent") as string;

    if (!id || !pressReleaseContent) {
      return NextResponse.json(
        { error: "Missing 'id' or 'pressReleaseContent'" },
        { status: 400 }
      );
    }

    const result = await handleUploadImage(formData, id, pressReleaseContent);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/upload-image:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
