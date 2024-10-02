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
  const image = pressRelease.image_url;
  const imageCaption = pressRelease.image_caption;
  const id = pressRelease.id;
  const [imageWasUploaded, setImageWasUploaded] = useState<boolean>(false);

  return (
    <div className="max-w-[650px] m-auto">
      <div className="py-4">
        {keywords?.length > 0 && (
          <ul className="text-black list-disc pl-5">
            {keywords.map((keyword, index) => (
              <Badge className="inline-block mx-1" key={index}>
                {keyword}
              </Badge>
            ))}
          </ul>
        )}
      </div>
      <div className="px-6 w-full text-center">
        {imageWasUploaded ? (
          <div>
            <Image
              src={image}
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
            setImageWasUploaded={setImageWasUploaded}
            pressReleaseContent={pressRelease.pressrelease_body}
          />
        )}
      </div>
    </div>
  );
}
