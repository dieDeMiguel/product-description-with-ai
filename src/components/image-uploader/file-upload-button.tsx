"use client";

import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import UploadingIndicator from "./uploading-indicator";

interface FileUploadButtonProps {
  id: number;
  setImageUrl: (url: string) => void;
  className?: string;
}

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export function FileUploadButton({
  id,
  setImageUrl,
  className,
}: FileUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert(
          "File size exceeds the maximum limit of 2MB. Please choose a smaller file."
        );
        return;
      }
      const formData = new FormData();
      formData.append("image", file);
      formData.append("id", id.toString());
      setIsUploading(true);
      try {
        const uploadResponse = await fetch("/api/upload-image", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.error || "Failed to upload image");
        }

        const { url } = await uploadResponse.json();
        setImageUrl(url);
      } catch (error) {
        console.error("Error uploading image or generating caption:", error);
        alert("Failed to upload image or generate caption. Please try again.");
      } finally {
        setIsUploading(false);
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
      {isUploading ? (
        <UploadingIndicator />
      ) : (
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="font-semibold flex items-center justify-center"
        >
          Upload Image (Max 2MB)
        </Button>
      )}
    </div>
  );
}
