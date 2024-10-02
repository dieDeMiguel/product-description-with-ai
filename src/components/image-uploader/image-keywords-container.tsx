"use client";

import { PressReleaseAsset } from "@/db";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { FileUploadButton } from "./file-upload-button";

export default function ImageKeywordsContainer(
  pressRelease: PressReleaseAsset
) {
  const keywords = pressRelease?.keywords?.split(",");
  const id = pressRelease?.id;
  const [imageUrl, setImageUrl] = useState<string>(
    pressRelease?.image_url || ""
  );
  const [imageCaption, setImageCaption] = useState<string>(
    pressRelease?.image_caption || ""
  );

  return (
    <div className="max-w-[650px] m-auto my-10">
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
            <p className="text-center text-sm text-gray-500 mt-4">
              {imageCaption}
            </p>
          </div>
        ) : (
          <FileUploadButton
            className={"mt-20"}
            id={id}
            setImageUrl={setImageUrl}
            setImageCaption={setImageCaption}
            pressReleaseContent={pressRelease.pressrelease_body}
          />
        )}
      </div>
    </div>
  );
}
