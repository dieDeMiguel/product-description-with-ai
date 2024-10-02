"use client";

import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import React, { useRef, useState } from "react";

export function FileUploadButton({
  id,
  setImageUrl,
  setImageCaption,
  className,
  pressReleaseContent,
}: {
  id: number;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  setImageCaption: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  pressReleaseContent: string;
}) {
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("id", id.toString());
      formData.append("pressReleaseContent", pressReleaseContent);

      setLoadingImage(true);
      try {
        const response = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to upload image");
        }

        const { url, imageCaption } = await response.json();
        setImageUrl(url);
        setImageCaption(imageCaption);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      } finally {
        setLoadingImage(false);
      }
    }
  };

  return (
    <div className={className}>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />
      <Button
        onClick={() => fileInputRef.current?.click()}
        disabled={loadingImage}
      >
        {loadingImage ? (
          <div className="flex gap-2">
            <LoaderIcon className="animate-spin" />
            <p>Uploading...</p>
          </div>
        ) : (
          "Upload Image"
        )}
      </Button>
    </div>
  );
}
