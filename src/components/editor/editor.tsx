// src/components/editor/editor.tsx
"use client";
import { ProductDescriptionAsset } from "@/db";
import useInitializeEditor from "@/hooks/useInitializeEditor";
import { cn } from "@/lib/utils";
import EditorJS, { OutputBlockData } from "@editorjs/editorjs";
import { forwardRef, useImperativeHandle, useRef } from "react";
import "./editor.css";

interface EditorProps {
  sectionID: keyof ProductDescriptionAsset;
  className?: string;
  wrapperClassName?: string;
  productDescription: OutputBlockData[];
  isReadOnly: boolean;
}

const Editor = forwardRef<EditorJS | null, EditorProps>(
  (
    {
      sectionID,
      className = "",
      wrapperClassName = "",
      productDescription,
      isReadOnly,
    },
    ref
  ) => {
    const editorRef = useRef<EditorJS | null>(null);

    useInitializeEditor(
      editorRef,
      true,
      sectionID,
      productDescription,
      isReadOnly
    );

    useImperativeHandle(ref, () => editorRef.current as EditorJS);

    return (
      <div className={cn("editor-wrapper", wrapperClassName)}>
        <div
          id={`${sectionID}`}
          key={`${sectionID}`}
          className={cn("editor-content text-black", className)}
        />
      </div>
    );
  }
);

Editor.displayName = "Editor";

export default Editor;
