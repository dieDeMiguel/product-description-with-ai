import { Button } from "@/components/ui/button";
import React, { useRef } from "react";

export function FileUploadButton({
  onUploadImage,
}: {
  onUploadImage: (formData: FormData) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      await onUploadImage(formData);
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
