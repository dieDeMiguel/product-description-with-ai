"use server";

import { addImage } from "@/db";
import { inngest } from "@/inngest/client";
import { put } from "@vercel/blob";

export const handleUploadImage = async (formData: FormData) => {
  const file = formData.get("image") as Blob;
  const buffer = await file.arrayBuffer();
  const data = Buffer.from(buffer);

  const randomFileName = Math.random().toString(36).substring(2);

  const { url } = await put(`images/${randomFileName}.jpg`, data, {
    access: "public",
  });

  const imageId = await addImage(url);

  await inngest.send({
    name: "generate/image-caption",
    data: {
      imageId,
      url,
    },
  });
};
