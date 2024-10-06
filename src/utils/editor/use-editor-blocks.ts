import { PressReleaseAsset } from "@/db";
import { OutputBlockData } from "@editorjs/editorjs";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

const useEditorBlocks = (data: PressReleaseAsset | null | undefined) =>
  useMemo(() => {
    if (data?.pressrelease_body) {
      const parsedBody = JSON.parse(JSON.parse(data?.pressrelease_body));
      return parsedBody?.blocks?.map((block: OutputBlockData) => ({
        ...block,
        id: block.id || uuidv4(),
      }));
    }
  }, [data]);

export default useEditorBlocks;
