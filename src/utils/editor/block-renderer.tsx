import { OutputBlockData } from "@editorjs/editorjs";
import React from "react";

const BlockRenderer = ({ blocks }: { blocks: OutputBlockData[] }) => {
  return (
    <div className="prose">
      {blocks.map((block) => {
        switch (block.type) {
          case "header":
            return (
              <Header
                key={block.id}
                level={block.data.level!}
                text={block.data.text}
              />
            );
          case "paragraph":
            return <Paragraph key={block.id} text={block.data.text} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default BlockRenderer;

const Header = ({ level, text }: { level: number; text: string }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return React.createElement(Tag, { className: "" }, text);
};
const Paragraph = ({ text }: { text: string }) => {
  return <p className="ce-paragraph cdx-block">{text}</p>;
};
