"use client";
import useInitializeEditor from "@/hooks/useInitializeEditor";
import { cn } from "@/utils/cn";
import EditorJS, { OutputBlockData } from "@editorjs/editorjs";
import { useRef } from "react";
import "./editor.css";
interface EditorProps {
  sectionID: string;
  className?: string;
  wrapperClassName?: string;
  data: OutputBlockData[];
}

const Editor: React.FC<EditorProps> = ({
  sectionID,
  className = "",
  wrapperClassName = "",
  data,
}) => {
  const editorRef = useRef<EditorJS | null>(null);

  useInitializeEditor(editorRef, true, sectionID, data);

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
