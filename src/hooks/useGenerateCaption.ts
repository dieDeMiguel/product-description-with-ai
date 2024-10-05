import { useEffect } from "react";

const useGenerateCaption = (
  id: number,
  imageUrl: string,
  language: string,
  imageCaption: string,
  setImageCaption: (caption: string) => void
) => {
  useEffect(() => {
    if (imageUrl && language && !imageCaption) {
      const generateCaption = async () => {
        const captionResponse = await fetch("/api/generate-caption", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            imageUrl,
            language,
          }),
        });

        if (!captionResponse.ok) {
          const errorData = await captionResponse.json();
          throw new Error(errorData.error || "Failed to generate caption");
        }
        const { caption } = await captionResponse.json();
        setImageCaption(caption);
      };
      generateCaption();
    }
  }, [id, imageUrl, language, imageCaption, setImageCaption]);
};

export default useGenerateCaption;
