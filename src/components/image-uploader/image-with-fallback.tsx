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
          alt="Generated press release image"
          fill
          className={`object-cover rounded-lg transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => {
            console.error("Error loading image");
            setIsLoading(false);
            setImageUrl("/path/to/fallback-image.jpg");
          }}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg">
            <UploadingIndicator />
          </div>
        )}
        <Button
          className="absolute bottom-2 right-2 font-semibold"
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
