import { PressReleaseAsset } from "@/db";
import { BlockAPI } from "@editorjs/editorjs";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

const useEditorBlocks = (
  data: PressReleaseAsset | null | undefined,
  sectionId: keyof PressReleaseAsset
) =>
  useMemo(() => {
    if (sectionId === "pressrelease_body" && data?.pressrelease_body) {
      const parsedBody = JSON.parse(JSON.parse(data.pressrelease_body));
      return parsedBody?.blocks?.map((block: BlockAPI) => ({
        ...block,
        id: block.id || uuidv4(),
      }));
    } else {
      return [
        {
          type: "paragraph",
          data: {
            text: data?.[sectionId] || "",
          },
          id: uuidv4(),
        },
      ];
    }
  }, [data, sectionId]);

export default useEditorBlocks;
