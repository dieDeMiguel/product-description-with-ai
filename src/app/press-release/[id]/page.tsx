import ImageKeywordsContainer from "@/components/image-uploader/image-keywords-container";
import EditorPlaceholder from "@/components/ui/editor-placeholder";
import { getProductDescription } from "@/db";

import dynamic from "next/dynamic";
import { headers } from "next/headers";
import Link from "next/link";

const Editor = dynamic(() => import("@/components/editor/editor"), {
  ssr: false,
  loading: () => <EditorPlaceholder />,
});

export default async function Page() {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  const id = pathname?.split("/").pop() || "";
  const numericId = parseInt(id, 10);
  const pressRelease = await getProductDescription(numericId);

  return (
    <div className="max-w-maxWidthEditorCanvas w-full lg:w-3/4 shadow-md h-full overflow-auto bg-white px-4 py-8 lg:px-6 rounded-lg flex flex-col gap-2">
      <Editor
        sectionID="description"
        productDescription={pressRelease}
        wrapperClassName=""
        className="editor-content"
        isReadOnly={false}
      />
      <div className="max-w-maxWidthEditorCanvas m-auto">
        <p className="text-xs text-gray-500">
          The generated content can contain errors, see &apos;Impresum&apos;
          page for more Information
        </p>
        <p className="text-xs text-gray-500">
          Der generierte Inhalt kann Fehler enthalten, siehe
          &apos;Impressum&apos;-Seite für weitere Informationen.
        </p>
      </div>
      <ImageKeywordsContainer {...pressRelease} />
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
}
