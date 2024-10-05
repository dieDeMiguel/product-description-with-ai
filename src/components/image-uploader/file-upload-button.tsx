"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React, { useRef, useState } from "react";

interface FileUploadButtonProps {
  id: number;
  setImageUrl: (url: string) => void;
  className?: string;
}

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
      <Button
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="font-semibold flex items-center justify-center"
      >
        {isUploading ? (
          <div className="flex gap-2 items-center">
            <Loader2 className="animate-spin" size={16} />
            <span>Uploading...</span>
          </div>
        ) : (
          "Upload Image"
        )}
      </Button>
    </div>
  );
}
