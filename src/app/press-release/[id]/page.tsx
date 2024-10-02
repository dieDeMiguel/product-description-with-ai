import Editor from "@/components/editor/editor";
import ImageContainer from "@/components/image-comtainer";
import { getGeneratedPressRelease } from "@/db";
import { headers } from "next/headers";

export default async function Page() {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  const id = pathname?.split("/").pop() || "";
  const numericId = parseInt(id, 10);
  const pressRelease = await getGeneratedPressRelease(numericId);
  return (
    <div className="w-[900px] shadow-md h-full overflow-auto bg-white py-8 px-6 rounded-lg">
      <Editor
        sectionID="title"
        pressRelease={pressRelease}
        wrapperClassName=""
        className="text-2xl font-bold"
        isReadOnly={false}
      />
      <Editor
        sectionID="pressrelease"
        pressRelease={pressRelease}
        wrapperClassName=""
        className="editor-content"
        isReadOnly={false}
      />
      <ImageContainer {...pressRelease} />
    </div>
  );
}
