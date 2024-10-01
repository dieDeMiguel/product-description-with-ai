import { PressReleaseAsset } from "@/db";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

const useEditorBlocks = (data: PressReleaseAsset | null | undefined) =>
  useMemo(() => {
    console.log("data en hooks", data?.pressrelease);
    if (data?.pressrelease) {
      return [
        {
          type: "paragraph",
          data: {
            text: data.pressrelease || "",
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
  }, [data?.pressrelease]);

export default useEditorBlocks;
