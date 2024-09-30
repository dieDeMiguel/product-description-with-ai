import { PressReleaseImage } from "@/db";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

const useEditorBlocks = (data: PressReleaseImage | null | undefined) =>
  useMemo(() => {
    console.log("data", data?.pressrelease);
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
