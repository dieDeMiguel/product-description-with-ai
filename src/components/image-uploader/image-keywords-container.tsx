"use client";

import { PressReleaseAsset } from "@/db";
import useGenerateCaption from "@/hooks/useGenerateCaption";
import { useState } from "react";
import { FileUploadButton } from "./file-upload-button";
import ImageWithFallback from "./image-with-fallback";
import KeywordsList from "./keywords-list";

export default function ImageKeywordsContainer(
  pressRelease: PressReleaseAsset
) {
  const { language, id, image_url, image_caption } = pressRelease;
  const keywords = pressRelease?.keywords?.split(",");
  const [imageUrl, setImageUrl] = useState<string>(image_url || "");
  const [imageCaption, setImageCaption] = useState<string>(image_caption || "");

  useGenerateCaption(id, imageUrl, language, imageCaption, setImageCaption);

  return (
    <div className="max-w-[var(--size-6500)]px] m-auto">
      {keywords?.length > 0 && <KeywordsList keywords={keywords} />}
      <div className="w-full text-center my-10">
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
            id={id}
            setImageUrl={setImageUrl}
          />
        )}
      </div>
    </div>
  );
}
