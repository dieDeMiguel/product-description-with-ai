"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React, { useRef, useState } from "react";

export function FileUploadButton({
  id,
  setImageUrl,
  className,
}: {
  id: number;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
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
        className="font-semibold"
      >
        {loadingImage ? (
          <div className="flex gap-2 items-center">
            <Loader2 className="animate-spin" />
            <p>Uploading...</p>
          </div>
        ) : (
          "Upload Image"
        )}
      </Button>
    </div>
  );
}
