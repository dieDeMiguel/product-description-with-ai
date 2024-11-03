"use client";

import { ProductDescriptionAsset } from "@/db";
import useGenerateCaption from "@/hooks/useGenerateCaption";
import { useState } from "react";
import { FileUploadButton } from "./file-upload-button";
import ImageWithFallback from "./image-with-fallback";
import KeywordsList from "./keywords-list";

export default function ImageKeywordsContainer(
  productDescription: ProductDescriptionAsset
) {
  const { language, uuid, image_url, image_caption } = productDescription;
  const keywords = productDescription?.tags?.split(",");
  const [imageUrl, setImageUrl] = useState<string>(image_url || "");
  const [imageCaption, setImageCaption] = useState<string>(image_caption || "");

  useGenerateCaption(uuid, imageUrl, language, imageCaption, setImageCaption);

  return (
    <div className="max-w-maxWidthEditorContent m-auto flex flex-col gap-10 mt-4">
      <div className="text-black space-y-2">
        <h3 className="font-bold">Product Tags:</h3>
        {keywords?.length > 0 && <KeywordsList keywords={keywords} />}
      </div>
      <div className="w-full text-center">
        {imageUrl ? (
          <ImageWithFallback
            imageUrl={imageUrl}
            imageCaption={imageCaption}
            setImageUrl={setImageUrl}
            setImageCaption={setImageCaption}
          />
        ) : (
          <FileUploadButton
            className="min-h-[var(--size-4000)] flex items-center justify-center"
            uuid={uuid}
            setImageUrl={setImageUrl}
          />
        )}
      </div>
    </div>
  );
}
