import Editor from "@/components/editor/editor";
import ImageKeywordsContainer from "@/components/image-uploader/image-keywords-container";
import { Label } from "@/components/ui/label";
import { getGeneratedPressRelease } from "@/db";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  const id = pathname?.split("/").pop() || "";
  const numericId = parseInt(id, 10);
  const pressRelease = await getGeneratedPressRelease(numericId);
  return (
    <div className="max-w-[900px] w-full lg:w-3/4 shadow-md h-full overflow-auto bg-white px-4 py-8 lg:px-6 rounded-lg">
      <Editor
        sectionID="title"
        pressRelease={pressRelease}
        wrapperClassName=""
        className="text-2xl font-bold"
        isReadOnly={false}
      />
      <Editor
        sectionID="pressrelease_body"
        pressRelease={pressRelease}
        wrapperClassName=""
        className="editor-content"
        isReadOnly={false}
      />
      <ImageKeywordsContainer {...pressRelease} />
      <Link
        href="/impressum"
        className="bg-white px-2 py-1 block text-center rounded-lg text-black"
      >
        <Label
          htmlFor="/impressum"
          className="cursor-pointer border border-black rounded-sm px-2 py-1"
        >
          Impressum
        </Label>
      </Link>
    </div>
  );
}
