"use client";
import { ProductDescriptionAsset } from "@/db";
import { useToast } from "@/hooks/use-toast";
import useInitializeEditor from "@/hooks/useInitializeEditor";
import { cn } from "@/lib/utils";
import EditorJS, { OutputBlockData } from "@editorjs/editorjs";
import { useRef } from "react";

interface EditorProps {
  sectionID: keyof ProductDescriptionAsset;
  className?: string;
  wrapperClassName?: string;
  editorData: OutputBlockData[];
  isReadOnly: boolean;
  id: number;
}

const Editor: React.FC<EditorProps> = ({
  sectionID,
  className = "",
  wrapperClassName = "",
  editorData,
  isReadOnly,
  id,
}) => {
  const editorRef = useRef<EditorJS | null>(null);

  const { toast } = useToast();
  const useInlineToolbar = true;

  const handleSaveChanges = async () => {
    if (editorRef.current) {
      editorRef.current.save().then(async (outputData) => {
        if (!outputData) return;
        const blocksOnly = { blocks: outputData.blocks };
        const stringifiedBlocks = JSON.stringify(blocksOnly);
        try {
          await fetch(`/api/update-product-description`, {
            method: "POST",
            body: JSON.stringify({
              id,
              value: stringifiedBlocks,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          toast({
            description: "Your content has been saved",
            className: "bg-blue-500 text-white",
          });
        } catch (error) {
          console.error("Error saving changes:", error);
        }
      });
    }
  };

  useInitializeEditor(
    editorRef,
    useInlineToolbar,
    sectionID,
    editorData,
    isReadOnly,
    handleSaveChanges
  );
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
