import { ProductDescriptionAsset } from "@/db";
import { OutputBlockData } from "@editorjs/editorjs";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

const useEditorBlocks = (data: ProductDescriptionAsset | null | undefined) =>
  useMemo(() => {
    if (data?.description) {
      const parsedBody = JSON.parse(data?.description);
      return parsedBody?.blocks?.map((block: OutputBlockData) => ({
        ...block,
        id: block.id || uuidv4(),
      }));
    }
  }, [data]);

export default useEditorBlocks;
