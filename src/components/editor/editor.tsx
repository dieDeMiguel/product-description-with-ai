"use client";
import { PressReleaseAsset } from "@/db";
import useInitializeEditor from "@/hooks/useInitializeEditor";
import { cn } from "@/lib/utils";
import useEditorBlocks from "@/utils/editor/memoise-editor-block";
import EditorJS from "@editorjs/editorjs";
import { useRef } from "react";
import "./editor.css";
interface EditorProps {
  sectionID: keyof PressReleaseAsset;
  className?: string;
  wrapperClassName?: string;
  pressRelease: PressReleaseAsset;
  isReadOnly: boolean;
}

const Editor: React.FC<EditorProps> = ({
  sectionID,
  className = "",
  wrapperClassName = "",
  pressRelease,
  isReadOnly,
}) => {
  const editorRef = useRef<EditorJS | null>(null);
  const blocks = useEditorBlocks(pressRelease, sectionID);

  useInitializeEditor(editorRef, true, sectionID, blocks, isReadOnly);

  return (
    <div className={cn("editor-wrapper", wrapperClassName)}>
      <div
        id={`${sectionID}`}
        key={`${sectionID}`}
        className={cn("editor-content text-black", className)}
      />
    </div>
  );
};

export default Editor;
