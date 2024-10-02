import { PressReleaseAsset } from "@/db";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

const useEditorBlocks = (
  data: PressReleaseAsset | null | undefined,
  sectionId: keyof PressReleaseAsset
) =>
  useMemo(() => {
    if (data?.pressrelease_body) {
      return [
        {
          type: "paragraph",
          data: {
            text: data[sectionId] || "",
          },
          id: uuidv4(),
        },
      ];
    } else {
      return [
        {
          type: "paragraph",
          data: {
            text: "",
          },
          id: uuidv4(),
        },
      ];
    }
  }, [data, sectionId]);

export default useEditorBlocks;
