"use client";

import { OutputBlockData } from "@editorjs/editorjs";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";

interface RenderedBlocksProps {
  blocks: OutputBlockData[];
}

const RenderedBlocks = ({ blocks }: RenderedBlocksProps) => {
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
    h1: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1 className="custom-h1" {...props} />
    ),
    h2: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2 className="custom-h2" {...props} />
    ),
    p: ({ ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p className="custom-p" {...props} />
    ),
  };

  return (
    <div>
      <ReactMarkdown components={components}>{markdownContent}</ReactMarkdown>
    </div>
  );
};

export default RenderedBlocks;
