import { handleUploadImage } from "@/app/actions/handle-upload-image";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const id = parseInt(formData.get("id") as string, 10);
    const image = formData.get("image") as File;
    if (!id || !image) {
      return NextResponse.json(
        { error: "Missing 'id' or 'image" },
        { status: 400 }
      );
    }

    const { url } = await handleUploadImage(formData, id);

    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/upload-image:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
