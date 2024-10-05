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
  const [loadingImage, setLoadingImage] = useState<boolean>(false);

  useGenerateCaption(id, imageUrl, language, imageCaption, setImageCaption);

  return (
    <div className="max-w-[650px] m-auto">
      {keywords?.length > 0 && <KeywordsList keywords={keywords} />}
      <div className="w-full text-center my-10 min-h-[400px] flex items-center justify-center">
        {imageUrl ? (
          <ImageWithFallback
            imageUrl={imageUrl}
            imageCaption={imageCaption}
            setImageUrl={setImageUrl}
            setImageCaption={setImageCaption}
            setLoadingImage={setLoadingImage}
          />
        ) : (
          <FileUploadButton
            className={
              "h-full w-full flex flex-col items-center justify-center"
            }
            id={id}
            setImageUrl={setImageUrl}
            setLoadingImage={setLoadingImage}
            loadingImage={loadingImage}
          />
        )}
      </div>
    </div>
  );
}
