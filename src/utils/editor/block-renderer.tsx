"use client";

import { OutputBlockData } from "@editorjs/editorjs";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";

const BlockRenderer = ({ blocks }: { blocks: OutputBlockData[] }) => {
  const markdownContent = useMemo(() => {
    return blocks
      .map((block) => {
        switch (block.type) {
          case "header":
            const hashes = "#".repeat(block.data.level || 1);
            return `${hashes} ${block.data.text}`;
          case "paragraph":
            return block.data.text;
          default:
            return "";
        }
      })
      .join("\n\n");
  }, [blocks]);

  const components = {
    h1: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1 className="font-arial my-8" {...props} />
    ),
    h2: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2 className="font-arial my-8" {...props} />
    ),
    p: ({ ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p className="font-arial my-8" {...props} />
    ),
  };

  return (
    <ReactMarkdown components={components}>{markdownContent}</ReactMarkdown>
  );
};

export default BlockRenderer;
