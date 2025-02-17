import { generateProductTags } from "@/ai/generate-product-tags";
import Disclaimer from "@/components/editor/disclaimer/disclaimer";
import ImageContainer from "@/components/image-uploader/image-keywords-container";
import Tags from "@/components/tags/tags";
import EditorPlaceholder from "@/components/ui/editor-placeholder";
import SkeletonTags from "@/components/ui/SkeletonTags";
import { getProductDescription, ProductDescriptionAsset } from "@/db";
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

const Editor = dynamic(() => import("@/components/editor/editor/editor"), {
  loading: () => <EditorPlaceholder />,
});

export default async function Page() {
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");
  const uuid = pathname?.split("/").pop() || "";
  const productDescription: ProductDescriptionAsset =
    await getProductDescription(uuid);

  const tags = generateProductTags(productDescription);

  if (!productDescription) {
    return <div>Product description not found</div>;
  }

  return (
    <div className="max-w-maxWidthEditorCanvas w-full lg:w-3/4 shadow-md min-h-[600px] overflow-auto bg-white px-4 py-8 lg:px-6 rounded-lg flex flex-col gap-2">
      <Editor
        sectionID="description"
        editorData={JSON.parse(productDescription.description).blocks || []}
        wrapperClassName=""
        className="editor-content"
        isReadOnly={false}
        uuid={productDescription?.uuid}
      />
      <Disclaimer />
      <Suspense fallback={<SkeletonTags />}>
        <Tags tagsPromise={tags} />
      </Suspense>
      <ImageContainer {...productDescription} />
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
