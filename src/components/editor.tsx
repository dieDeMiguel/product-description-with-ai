"use client";
import useInitializeEditor from "@/hooks/useInitializeEditor";
import { EditorHandle } from "@/interfaces/editorHandle";
import { cn } from "@/utils/cn";
import EditorJS from "@editorjs/editorjs";
import { forwardRef, useImperativeHandle, useRef } from "react";

const Editor = forwardRef<
  EditorHandle,
  {
    sectionID: string;
    className?: string;
    wrapperClassName?: string;
  }
>(({ sectionID, className = "", wrapperClassName = "" }, ref) => {
  const editorRef = useRef<EditorJS | null>(null);

  useInitializeEditor(editorRef, true, sectionID);

  useImperativeHandle(ref, () => ({
    appendText: async (text: string) => {
      if (editorRef?.current) {
        try {
          const data = await editorRef?.current?.save();
          const lastBlockIndex = data?.blocks?.length - 1;

          if (
            lastBlockIndex >= 0 &&
            data?.blocks[lastBlockIndex]?.type === "paragraph"
          ) {
            const updatedText = data?.blocks[lastBlockIndex]?.data?.text + text;
            await editorRef?.current?.blocks?.update(
              lastBlockIndex?.toString(),
              {
                type: "paragraph",
                data: { text: updatedText },
              }
            );
          } else {
            await editorRef?.current?.blocks?.insert("paragraph", {
              text: text,
            });
          }
        } catch (error) {
          console.error("Error appendText:", error);
        }
      }
    },
  }));

  return (
    <div className={wrapperClassName}>
      <div
        id={`${sectionID}`}
        key={`${sectionID}`}
        className={cn("text-black", className)}
      />
    </div>
  );
});

Editor.displayName = "Editor";

export default Editor;
