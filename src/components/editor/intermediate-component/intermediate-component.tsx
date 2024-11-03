import { Button } from "@/components/ui/button";
import { ProductDescriptionAsset } from "@/db";
import RenderedBlocks from "@/utils/editor/block-renderer";
import { OutputBlockData } from "@editorjs/editorjs";
import { useRouter } from "next/navigation";

const IntermediateComponent = ({
  editorData,
  stop,
  isLoading,
  language,
  setStep,
  setEditorData,
}: {
  editorData: OutputBlockData[];
  isLoading: boolean;
  stop: () => void;
  language: string;
  setStep: (step: number) => void;
  setEditorData: (editorData: OutputBlockData[]) => void;
}) => {
  const router = useRouter();
  const handleAcceptDescription = async () => {
    setStep(3);
    setEditorData([]);
    const response = await fetch("/api/create-product-description-entry", {
      method: "POST",
      body: JSON.stringify({ editorData, language }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const productDescriptionAsset: ProductDescriptionAsset =
      await response.json();
    await fetch("/api/generate-product-tags", {
      method: "POST",
      body: JSON.stringify({ productDescriptionAsset }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.push(`/product-description/${productDescriptionAsset.uuid}`);
  };
  const handleStartOver = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-maxWidthEditorCanvas w-full min-h-[400px] shadow-md overflow-auto bg-white px-4 pt-8 pb-14 lg:px-6 rounded-lg flex flex-col justify-between gap-2">
      <div className="self-start text-center w-full">
        <div className="flex justify-center w-full">
          {isLoading ? (
            <Button onClick={() => stop()}>Stop Stream</Button>
          ) : (
            <div className="flex gap-4">
              <Button onClick={handleAcceptDescription}>I like it</Button>
              <Button onClick={handleStartOver}>Start over</Button>
            </div>
          )}
        </div>
        <RenderedBlocks blocks={editorData} isGenerating={isLoading} />
      </div>
    </div>
  );
};

export default IntermediateComponent;
