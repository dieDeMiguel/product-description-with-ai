"use client";

import { useState } from "react";
import { getAnswer } from "./actions/getAnswer";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Home() {
  const [generation, setGeneration] = useState<string>("");

  return (
    <div>
      <button
        onClick={async () => {
          const { text } = await getAnswer("Why is the sky blue?");
          setGeneration(text);
        }}
      >
        Answer
      </button>
      <div>{generation}</div>
    </div>
  );
}
