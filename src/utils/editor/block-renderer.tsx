/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { cn } from "@/lib/utils";
import { OutputBlockData } from "@editorjs/editorjs";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";

interface RenderedBlocksProps {
  blocks: OutputBlockData[];
  isGenerating: boolean;
}

const RenderedBlocks = ({ blocks, isGenerating }: RenderedBlocksProps) => {
  const markdownContent = useMemo(() => {
    return blocks
      .map((block) => {
        switch (block.type) {
          case "header":
            const level = block.data?.level || 1;
            const hashes = "#".repeat(level);
            return `${hashes} ${block.data?.text || ""}`;
          case "paragraph":
            return block.data?.text || "";
          default:
            return "";
        }
      })
      .join("\n\n");
  }, [blocks]);

  const components = {
    h1: ({
      node,
      ...props
    }: React.HTMLAttributes<HTMLHeadingElement> & { node?: unknown }) => (
      <h1 className="custom-h1" {...props}>
        {props.children}
      </h1>
    ),
    h2: ({
      node,
      ...props
    }: React.HTMLAttributes<HTMLHeadingElement> & { node?: unknown }) => (
      <h2 className="custom-h2" {...props}>
        {props.children}
      </h2>
    ),
    p: ({
      node,
      ...props
    }: React.HTMLAttributes<HTMLParagraphElement> & { node?: unknown }) => (
      <p className="custom-p" {...props}>
        {props.children}
      </p>
    ),
  };

  return (
    <>
      <ReactMarkdown
        className={cn("text-left", isGenerating && "block-renderer")}
        components={components}
      >
        {markdownContent}
      </ReactMarkdown>
    </>
  );
};

export default RenderedBlocks;
