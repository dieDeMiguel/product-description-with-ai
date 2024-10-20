import { Button } from "@/components/ui/button";
import EditorPlaceholder from "@/components/ui/editor-placeholder";
import RenderedBlocks from "@/utils/editor/block-renderer";
import { OutputBlockData } from "@editorjs/editorjs";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../editor/editor.css";

const Editor = dynamic(() => import("@/components/editor/editor/editor"), {
  ssr: false,
  loading: () => <EditorPlaceholder />,
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
    <div className="prose max-w-maxWidthEditorCanvas w-full lg:w-3/4 shadow-md h-full overflow-auto bg-white px-4 py-8 lg:px-6 rounded-lg flex flex-col gap-2">
      {isLoading && (
        <>
          <Button onClick={() => stop()}>Stop Stream</Button>
          <RenderedBlocks blocks={editorData} />
        </>
      )}
      {showEditor && (
        <Editor
          sectionID="description"
          editorData={editorData}
          wrapperClassName=""
          className="editor-content"
          isReadOnly={false}
        />
      )}
      <div className="max-w-maxWidthEditorCanvas m-auto">
        <p className="text-xs text-gray-500">
          The generated content can contain errors, see &apos;Impressum&apos;
          page for more Information
        </p>
        <p className="text-xs text-gray-500">
          Der generierte Inhalt kann Fehler enthalten, siehe
          &apos;Impressum&apos;-Seite für weitere Informationen.
        </p>
      </div>
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
