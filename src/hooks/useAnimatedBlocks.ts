"use client";

import { OutputBlockData } from "@editorjs/editorjs";
import { animate } from "framer-motion";
import { useEffect, useState, useRef } from "react";

type UseAnimatedBlocksProps = {
  blocks: OutputBlockData[];
  duration?: number; 
  ease?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut'; 
};

export function useAnimatedBlocks({
  blocks,
  duration = 2,
  ease = "easeOut",
}: UseAnimatedBlocksProps) {
  const [animatedBlocks, setAnimatedBlocks] = useState<OutputBlockData[]>([]);
  const prevBlocksRef = useRef<OutputBlockData[]>([]);

  useEffect(() => {
    const prevBlocks = prevBlocksRef.current;
    const newBlocks = blocks;

    // Update the animation only if there's a difference
    if (JSON.stringify(prevBlocks) !== JSON.stringify(newBlocks)) {
      const updatedAnimatedBlocks = [...animatedBlocks];

      newBlocks.forEach((newBlock, index) => {
        const prevBlock = prevBlocks[index];

        // If block is new, add it with empty text
        if (!prevBlock || prevBlock.id !== newBlock.id) {
          updatedAnimatedBlocks[index] = {
            ...newBlock,
            data: { ...newBlock.data, text: "" },
          };

          // Animate text addition
          animate(0, newBlock?.data?.text?.length, {
            duration,
            ease,
            onUpdate: (latest) => {
              setAnimatedBlocks((current) => {
                const updated = [...current];
                if (updated[index]) {
                  updated[index] = {
                    ...updated[index],
                    data: {
                      ...updated[index].data,
                      text: newBlock?.data?.text?.slice(0, Math.floor(latest)),
                    },
                  };
                }
                return updated;
              });
            },
            onComplete: () => {
              setAnimatedBlocks((current) => {
                const updated = [...current];
                if (updated[index]) {
                  updated[index] = {
                    ...updated[index],
                    data: {
                      ...updated[index]?.data,
                      text: newBlock?.data?.text,
                    },
                  };
                }
                return updated;
              });
            },
          });
        }
        // If block exists but text is updated, animate the difference
        else if (prevBlock?.data?.text !== newBlock?.data?.text) {
          const prevTextLength = prevBlock?.data?.text?.length || 0;
          const newText = newBlock?.data?.text;

          animate(prevTextLength, newText?.length, {
            duration,
            ease,
            onUpdate: (latest) => {
              setAnimatedBlocks((current) => {
                const updated = [...current];
                if (updated[index]) {
                  updated[index] = {
                    ...updated[index],
                    data: {
                      ...updated[index].data,
                      text: newText.slice(0, Math.floor(latest)),
                    },
                  };
                }
                return updated;
              });
            },
            onComplete: () => {
              setAnimatedBlocks((current) => {
                const updated = [...current];
                if (updated[index]) {
                  updated[index] = {
                    ...updated[index],
                    data: {
                      ...updated[index].data,
                      text: newText,
                    },
                  };
                }
                return updated;
              });
            },
          });
        }
      });

      // Sync remaining blocks
      setAnimatedBlocks(updatedAnimatedBlocks);
    }

    prevBlocksRef.current = blocks;
  }, [animatedBlocks, blocks, duration, ease]);

  return animatedBlocks;
}
