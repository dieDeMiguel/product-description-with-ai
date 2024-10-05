"use client";

import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import UploadingIndicator from "./uploading-indicator";

export function FileUploadButton({
  id,
  setImageUrl,
  className,
  setLoadingImage,
  loadingImage,
}: {
  id: number;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  setLoadingImage: React.Dispatch<React.SetStateAction<boolean>>;
  loadingImage: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("id", id.toString());
      setLoadingImage(true);
      try {
        const uploadResponse = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        });

        const { url } = await uploadResponse.json();
        setImageUrl(url);
      } catch (error) {
        console.error("Error uploading image or generating caption:", error);
        alert("Failed to upload image or generate caption. Please try again.");
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
      {loadingImage ? (
        <UploadingIndicator />
      ) : (
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={loadingImage}
          className="font-semibold"
        >
          Upload Image
        </Button>
      )}
    </div>
  );
}
