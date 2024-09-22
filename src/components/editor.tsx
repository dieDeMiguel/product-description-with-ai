"use client";

import useInitializeEditor from "@/hooks/useInitializeEditor";
import { cn } from "@/utils/cn";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { useRef } from "react";

export default function Editor({
  sectionID,
  className = "",
  wrapperClassName = "",
  content,
}: {
  sectionID: string;
  className?: string;
  wrapperClassName?: string;
  translationKey?: string;
  placeholderClass?: string;
  hidden?: boolean;
  allowNewBlocks?: boolean;
  isReadOnly?: boolean;
  content: OutputData | null;
  inlineToolbar?: boolean;
}) {
  const ref = useRef<EditorJS | null>(null);

  useInitializeEditor(ref, content, true, sectionID);

  return (
    <div className={wrapperClassName}>
      <div
        id={`${sectionID}`}
        key={`${sectionID}`}
        className={cn("py-editor-padding", className)}
      />
    </div>
  );
}
