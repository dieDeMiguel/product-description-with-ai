"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import UploadingIndicator from "./uploading-indicator";

interface ImageWithFallbackProps {
  imageUrl: string;
  imageCaption: string;
  setImageUrl: (url: string) => void;
  setImageCaption: (caption: string) => void;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  imageUrl,
  imageCaption,
  setImageUrl,
  setImageCaption,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="relative w-full aspect-video">
        <Image
          src={imageUrl}
          alt="Product"
          fill
          className={`object-cover rounded-lg transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          // onLoad={() => setIsLoading(false)}
          onError={() => {
            console.error("Error loading image");
            setIsLoading(false);
          }}
        />
        {isLoading && (
          <div className="h-full w-full flex items-center justify-center">
            <UploadingIndicator />
          </div>
        )}
        <Button
          className="absolute bottom-2 left-2 font-semibold bg-badgeBackground text-black hover:text-white"
          variant="destructive"
          onClick={() => {
            setImageUrl("");
            setImageCaption("");
          }}
        >
          Change Picture
        </Button>
      </div>
      <div className="min-h-[var(--size-420)] flex items-center justify-center">
        {imageCaption ? (
          <p className="text-sm text-black text-left">{imageCaption}</p>
        ) : (
          <UploadingIndicator />
        )}
      </div>
    </div>
  );
};

export default ImageWithFallback;
