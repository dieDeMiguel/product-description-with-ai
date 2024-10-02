"use server";

import { generateImageCaption } from "@/ai/generate-image-caption";
import { setImageUrl } from "@/db";
import { put } from "@vercel/blob";

export const handleUploadImage = async (
  formData: FormData,
  id: number,
  pressReleaseContent: string
) => {
  const file = formData.get("image") as Blob;
  const buffer = await file.arrayBuffer();
  const data = Buffer.from(buffer);
  const stringId = id.toString();

  const randomFileName = Math.random().toString(36).substring(2);

  const { url } = await put(`images/${randomFileName}.jpg`, data, {
    access: "public",
  });

  await setImageUrl(url, stringId);
  await generateImageCaption(id, url, pressReleaseContent);
};
