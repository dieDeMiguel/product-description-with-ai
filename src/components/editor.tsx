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
            const blockId = data.blocks[lastBlockIndex].id;
            if (blockId && updatedText?.trim()?.length > 0) {
              const block = editorRef?.current?.blocks?.getById(blockId);
              if (block) {
                await editorRef.current.blocks.update(blockId, {
                  type: "paragraph",
                  data: { text: updatedText },
                });
              }
            } else {
              console.warn(`Block with id "${blockId}" not found`);
            }
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
