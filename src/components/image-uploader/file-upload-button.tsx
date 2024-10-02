import { handleUploadImage } from "@/app/actions/handle-upload-image";
import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";

export function FileUploadButton({
  id,
  setImageWasUploaded,
  className,
  pressReleaseContent,
}: {
  id: number;
  setImageWasUploaded: React.Dispatch<React.SetStateAction<boolean>>;
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
      try {
        setLoadingImage(true);
        await handleUploadImage(formData, id, pressReleaseContent);
        setImageWasUploaded(true);
        setLoadingImage(false);
      } catch (error) {
        console.error("Error uploading image:", error);
        setLoadingImage(false);
        alert("An error occurred while uploading the image.");
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
      <Button onClick={() => fileInputRef.current?.click()}>
        {loadingImage ? "Uploading..." : "Upload Image"}
      </Button>
    </div>
  );
}
