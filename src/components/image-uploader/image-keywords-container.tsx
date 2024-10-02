"use client";

import { PressReleaseAsset } from "@/db";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { FileUploadButton } from "./file-upload-button";

export default function ImageKeywordsContainer(
  pressRelease: PressReleaseAsset
) {
  const keywords = pressRelease.keywords.split(",");
  const id = pressRelease.id;
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageCaption, setImageCaption] = useState<string>("");

  return (
    <div className="max-w-[650px] m-auto mt-10">
      {keywords?.length > 0 && (
        <ul className="text-black list-disc pl-5">
          {keywords.map((keyword, index) => (
            <Badge className="inline-block mx-1" key={index}>
              {keyword}
            </Badge>
          ))}
        </ul>
      )}
      <div className="px-6 w-full text-center">
        {imageUrl ? (
          <div>
            <Image
              src={imageUrl}
              width={300}
              height={200}
              alt="Generated press release image"
              className="w-full"
            />
            <p className="text-center text-sm text-gray-500">{imageCaption}</p>
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
