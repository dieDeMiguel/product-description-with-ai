import { Button } from "@/components/ui/button";
import RenderedBlocks from "@/utils/editor/block-renderer";
import { OutputBlockData } from "@editorjs/editorjs";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import Disclaimer from "../disclaimer/disclaimer";

const Editor = dynamic(() => import("@/components/editor/editor/editor"), {
  ssr: false,
});

const EditorComponent = ({
  editorData,
  isLoading,
  stop,
}: {
  editorData: OutputBlockData[];
  isLoading: boolean;
  stop: () => void;
}) => {
  const [showEditor, setShowEditor] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading) {
      setShowEditor(true);
    }
  }, [isLoading]);

  return (
    <div className="prose max-w-maxWidthEditorCanvas w-full lg:w-3/4 shadow-md h-full overflow-auto bg-white px-4 py-8 lg:px-6 rounded-lg flex flex-col justify-between gap-2">
      {isLoading && (
        <div className="self-start text-center w-full">
          <Button
            onClick={() => {
              stop();
              setShowEditor(true);
            }}
          >
            Stop Stream
          </Button>
          <RenderedBlocks blocks={editorData} />
        </div>
      )}
      {showEditor && (
        <div className="editor">
          <Editor
            sectionID="description"
            editorData={editorData}
            wrapperClassName=""
            className="editor-content"
            isReadOnly={false}
          />
          <Disclaimer />
        </div>
      )}
      <div className="flex justify-center gap-4 mt-6">
        <Link
          href="/"
          className="block text-center text-gray-500 hover:text-black cursor-pointer"
        >
          Home
        </Link>
        <Link
          href="/impressum"
          className="block text-center text-gray-500 hover:text-black cursor-pointer"
        >
          Impressum
        </Link>
      </div>
    </div>
  );
};

export default EditorComponent;
