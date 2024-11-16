"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define the types based on your schema
type BlockData = {
  text: string;
  level?: number;
};

export type Block = {
  id: string;
  type: "paragraph" | "header";
  data: BlockData;
};

type ContentRendererProps = {
  blocks: Block[];
};

export default function ContentRenderer({ blocks }: ContentRendererProps) {
  const [visibleBlocks, setVisibleBlocks] = useState<Block[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleBlocks((prev) => {
        if (prev.length < blocks.length) {
          return [...prev, blocks[prev.length]];
        }
        clearInterval(timer);
        return prev;
      });
    }, 1000); // Adjust this value to control the speed of block appearance

    return () => clearInterval(timer);
  }, [blocks]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <AnimatePresence>
        {visibleBlocks.map((block) => (
          <motion.div
            key={block.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {block.type === "header" && (
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {block.data.text}
              </motion.h2>
            )}
            {block.type === "paragraph" && (
              <TypingEffect text={block.data.text} />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Typing effect component
function TypingEffect({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => {
        if (i < text.length) {
          i++;
          return text.slice(0, i);
        }
        clearInterval(timer);
        return prev;
      });
    }, 20); // Adjust this value to control typing speed

    return () => clearInterval(timer);
  }, [text]);

  return <p className="text-base leading-relaxed">{displayedText}</p>;
}
