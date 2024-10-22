import Disclaimer from "@/components/editor/disclaimer/disclaimer";
import ImageKeywordsContainer from "@/components/image-uploader/image-keywords-container";
import EditorPlaceholder from "@/components/ui/editor-placeholder";
import { getProductDescription, ProductDescriptionAsset } from "@/db";

import dynamic from "next/dynamic";
import { headers } from "next/headers";
import Link from "next/link";

const Editor = dynamic(() => import("@/components/editor/editor/editor"), {
  ssr: false,
  loading: () => <EditorPlaceholder />,
});

export default async function Page() {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  const id = pathname?.split("/").pop() || "";
  const productDescription: ProductDescriptionAsset =
    await getProductDescription(+id);

  if (!productDescription) {
    return <div>Product description not found</div>;
  }

  return (
    <div className="max-w-maxWidthEditorCanvas w-full lg:w-3/4 shadow-md h-full overflow-auto bg-white px-4 py-8 lg:px-6 rounded-lg flex flex-col gap-2">
      <Editor
        sectionID="description"
        editorData={JSON.parse(productDescription.description).blocks || []}
        wrapperClassName=""
        className="editor-content"
        isReadOnly={false}
      />
      <Disclaimer />
      <ImageKeywordsContainer {...productDescription} />
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
