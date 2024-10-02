"use server";

import { setImageUrl } from "@/db";
import { inngest } from "@/inngest/client";
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

  await inngest.send({
    name: "generate/image-caption",
    data: {
      id,
      url,
      pressReleaseContent,
    },
  });
};
