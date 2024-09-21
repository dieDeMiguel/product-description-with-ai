"use client";

import { readStreamableValue } from "ai/rsc";
import { useState } from "react";
import { generate } from "../actions/stremeable";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Home() {
  const [generation, setGeneration] = useState<string>("");

  return (
    <div className="w-full h-full grid">
      <button
        onClick={async () => {
          const { output } = await generate("Why is the sky blue?");

          for await (const delta of readStreamableValue(output)) {
            setGeneration(
              (currentGeneration) => `${currentGeneration}${delta}`
            );
          }
        }}
      >
        Ask
      </button>

      <div>{generation}</div>
    </div>
  );
}
