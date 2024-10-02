import { PressReleaseAsset } from "@/db";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

const useEditorBlocks = (
  data: PressReleaseAsset | null | undefined,
  sectionId: keyof PressReleaseAsset
) =>
  useMemo(() => {
    if (data?.pressrelease) {
      return [
        {
          type: "paragraph",
          data: {
            text: sectionId || "",
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
  }, [data?.pressrelease, sectionId]);

export default useEditorBlocks;
