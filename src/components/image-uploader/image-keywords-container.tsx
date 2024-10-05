"use client";

import { PressReleaseAsset } from "@/db";
import useGenerateCaption from "@/hooks/useGenerateCaption";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { FileUploadButton } from "./file-upload-button";

export default function ImageKeywordsContainer(
  pressRelease: PressReleaseAsset
) {
  const { language, id, image_url, image_caption } = pressRelease;
  const keywords = pressRelease?.keywords?.split(",");
  const [imageUrl, setImageUrl] = useState<string>(image_url || "");
  const [imageCaption, setImageCaption] = useState<string>(image_caption || "");
  const [loadingImage, setLoadingImage] = useState<boolean>(true);

  useGenerateCaption(id, imageUrl, language, imageCaption, setImageCaption);

  return (
    <div className="max-w-[650px] m-auto">
      {keywords?.length > 0 && (
        <ul>
          {keywords.map((keyword, index) => (
            <Badge className="inline-block mx-1" key={index}>
              {keyword}
            </Badge>
          ))}
        </ul>
      )}
      <div className="w-full text-center my-10">
        {imageUrl ? (
          <div className="flex flex-col gap-4">
            {loadingImage && (
              <div className="w-full h-[400px] flex items-center justify-center bg-gray-200 rounded-lg">
                <Loader2 className="animate-spin text-black" />
              </div>
            )}
            <div className="relative">
              <Image
                src={imageUrl}
                width={300}
                height={200}
                alt="Generated press release image"
                className="w-full rounded-lg"
                onLoadingComplete={() => {
                  console.log("Image loaded");
                  setLoadingImage(false);
                }}
              />
              <Button
                className="absolute bottom-2 right-2 font-semibold"
                variant={"destructive"}
                onClick={() => {
                  setImageUrl("");
                  setImageCaption("");
                }}
              >
                Change Picture
              </Button>
            </div>
            <div className="flex gap-2 items-center justify-center">
              {imageCaption ? (
                <p className="text-sm text-black text-left">{imageCaption}</p>
              ) : (
                <Loader2 className="animate-spin text-black" />
              )}
            </div>
          </div>
        ) : (
          <FileUploadButton
            className={
              "min-h-[400px] flex flex-col items-center justify-center"
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
