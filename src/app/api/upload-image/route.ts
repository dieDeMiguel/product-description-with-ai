import { handleUploadImage } from "@/app/actions/handle-upload-image";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const uuid = formData.get("uuid") as string;
    const image = formData.get("image") as File;
    if (!uuid || !image) {
      return NextResponse.json(
        { error: "Missing 'uuid' or 'image" },
        { status: 400 }
      );
    }

    const { url } = await handleUploadImage(formData, uuid);

    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/upload-image:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
