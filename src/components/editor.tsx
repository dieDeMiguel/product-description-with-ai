"use client";

import { cn } from "@/utils/cn";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { useRef } from "react";

import useInitializeEditor from "@/hooks/useInitializeEditor";
import "./editor.css";

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

  useInitializeEditor(ref, content, true);

  return (
    <div className={wrapperClassName}>
      <div
        id={`custom-${sectionID}`}
        key={`custom-key-${sectionID}`}
        className={cn("prose bg-custom-white py-editor-padding", className)}
      />
    </div>
  );
}
