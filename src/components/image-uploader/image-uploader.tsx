import { handleUploadImage } from "@/app/actions/handle-upload-image";
import { Button } from "@/components/ui/button";
import React, { useRef } from "react";

export function FileUploadButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      await handleUploadImage(formData);
    }
  };

  return (
    <div>
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
