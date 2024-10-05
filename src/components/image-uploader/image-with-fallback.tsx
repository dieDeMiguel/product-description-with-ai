import Image from "next/image";
import { Button } from "../ui/button";
import UploadingIndicator from "./uploading-indicator";

interface ImageWithFallbackProps {
  imageUrl: string;
  imageCaption: string;
  setImageUrl: (url: string) => void;
  setImageCaption: (caption: string) => void;
  setLoadingImage: (loading: boolean) => void;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  imageUrl,
  imageCaption,
  setImageUrl,
  setImageCaption,
  setLoadingImage,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="relative w-full h-full">
        <Image
          src={imageUrl}
          width={300}
          height={200}
          alt="Generated press release image"
          className="w-full rounded-lg"
        />
        <Button
          className="absolute bottom-2 right-2 font-semibold"
          variant={"destructive"}
          onClick={() => {
            setImageUrl("");
            setImageCaption("");
            setLoadingImage(false);
          }}
        >
          Change Picture
        </Button>
      </div>
      <div className="flex gap-2 items-center justify-center">
        {imageCaption ? (
          <p className="text-sm text-black text-left">{imageCaption}</p>
        ) : (
          <UploadingIndicator />
        )}
      </div>
    </div>
  );
};

export default ImageWithFallback;
