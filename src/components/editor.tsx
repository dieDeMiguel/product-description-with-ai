"use client";

import useInitializeEditor from "@/hooks/useInitializeEditor";
import { cn } from "@/utils/cn";
import EditorJS, { OutputBlockData } from "@editorjs/editorjs";
import { forwardRef, useImperativeHandle, useRef } from "react";

const Editor = forwardRef(
  (
    {
      sectionID,
      className = "",
      wrapperClassName = "",
    }: {
      sectionID: string;
      className?: string;
      wrapperClassName?: string;
    },
    ref
  ) => {
    const editorRef = useRef<EditorJS | null>(null);

    useInitializeEditor(editorRef, true, sectionID);

    useImperativeHandle(ref, () => ({
      insertBlock: async (block: OutputBlockData) => {
        if (editorRef.current) {
          try {
            await editorRef.current.blocks.insert(block.type, block.data);
          } catch (error) {
            console.error("Error inserting block:", error);
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
  }
);

Editor.displayName = "Editor";

export default Editor;
