import { handleUploadImage } from "@/app/actions/handle-upload-image";
import { Button } from "@/components/ui/button";
import React, { useRef } from "react";

export function FileUploadButton({
  id,
  setImageWasUploaded,
  className,
  pressRelease,
}: {
  id: string;
  setImageWasUploaded: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  pressRelease: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        await handleUploadImage(formData, id, pressRelease);
        setImageWasUploaded(true);
      } catch (error) {
        console.error("Error uploading image:", error);
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
        Upload Image
      </Button>
    </div>
  );
}
