import { Button } from "@/components/ui/button";
import RenderedBlocks from "@/utils/editor/block-renderer";
import { OutputBlockData } from "@editorjs/editorjs";
import { useRouter } from "next/navigation";

const EditorComponent = ({
  editorData,
  stop,
  isLoading,
  language,
}: {
  editorData: OutputBlockData[];
  isLoading: boolean;
  stop: () => void;
  language: string;
}) => {
  const router = useRouter();
  const handleAcceptDescription = async () => {
    const id = await fetch("/api/create-product-description-entry", {
      method: "POST",
      body: JSON.stringify({ editorData, language }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data.id;
      });
    console.log(id);
    router.push(`/product-description/${id}`);
  };
  const handleStartOver = () => {
    window.location.reload();
  };

  return (
    <div className="prose max-w-maxWidthEditorCanvas w-full shadow-md h-full overflow-auto bg-white px-4 py-8 lg:px-6 rounded-lg flex flex-col justify-between gap-2">
      <div className="self-start text-center w-full">
        <div className="flex justify-center w-full">
          {isLoading ? (
            <Button onClick={() => stop()}>Stop Stream</Button>
          ) : (
            <>
              <Button onClick={handleAcceptDescription}>
                Accept this version
              </Button>
              <Button onClick={handleStartOver}>Start over</Button>
            </>
          )}
        </div>
        <RenderedBlocks blocks={editorData} />
      </div>
    </div>
  );
};

export default EditorComponent;
