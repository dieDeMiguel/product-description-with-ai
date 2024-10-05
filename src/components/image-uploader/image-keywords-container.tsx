"use client";

import { PressReleaseAsset } from "@/db";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { FileUploadButton } from "./file-upload-button";

export default function ImageKeywordsContainer(
  pressRelease: PressReleaseAsset
) {
  const { language, id, image_url, image_caption } = pressRelease;
  console.log("image_url", image_url);
  const keywords = pressRelease?.keywords?.split(",");
  const [imageUrl, setImageUrl] = useState<string>(image_url || "");
  const [imageCaption, setImageCaption] = useState<string>(image_caption || "");

  useEffect(() => {
    if (imageUrl && language && !imageCaption) {
      console.log("Generating useEffect", imageUrl, language);
      const generateCaption = async () => {
        const captionResponse = await fetch("/api/generate-caption", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            imageUrl,
            language,
          }),
        });

        if (!captionResponse.ok) {
          const errorData = await captionResponse.json();
          throw new Error(errorData.error || "Failed to generate caption");
        }
        const { caption } = await captionResponse.json();
        setImageCaption(caption);
      };
      generateCaption();
    }
  }, [id, imageUrl, language]);

  return (
    <div className="max-w-[650px] m-auto my-8">
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
          <div>
            <div className="relative">
              <Image
                src={imageUrl}
                width={300}
                height={200}
                alt="Generated press release image"
                className="w-full rounded-lg"
              />
              <Button
                className="absolute bottom-2 right-2"
                variant={"destructive"}
                onClick={() => {
                  setImageUrl("");
                  setImageCaption("");
                }}
              >
                Change Picture
              </Button>
            </div>
            <div className="flex gap-2 items-center justify-center mt-4">
              {imageCaption ? (
                <p className="text-center text-sm text-black">{imageCaption}</p>
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
            setImageCaption={setImageCaption}
            language={pressRelease.language}
          />
        )}
      </div>
    </div>
  );
}
