import { PressRelease } from "@/db";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

const useEditorBlocks = (data: PressRelease | null | undefined) =>
  useMemo(() => {
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
