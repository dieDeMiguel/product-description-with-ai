import EditorPlaceholder from "@/components/ui/editor-placeholder";
import EditorJS from "@editorjs/editorjs";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef } from "react";

const Editor = dynamic(() => import("@/components/editor/editor/editor"), {
  ssr: false,
  loading: () => <EditorPlaceholder />,
});

interface ProductDescriptionEditorProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  productDescription: any;
}

const ProductDescriptionEditor: React.FC<ProductDescriptionEditorProps> = ({
  productDescription,
}) => {
  const editorRef = useRef<EditorJS>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.render({ blocks: productDescription });
    }
  }, [productDescription]);

  return (
    <div className="max-w-maxWidthEditorCanvas w-full lg:w-3/4 shadow-md h-full overflow-auto bg-white px-4 py-8 lg:px-6 rounded-lg flex flex-col gap-2">
      <Editor
        sectionID="description"
        productDescription={productDescription}
        wrapperClassName=""
        className="editor-content"
        isReadOnly={false}
      />
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

export default ProductDescriptionEditor;
