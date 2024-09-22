"use client";

import Editor from "@/components/editor";
import mutateApiResponse from "@/utils/mutateApiResponse";
import { readStreamableValue } from "ai/rsc";
import { useState } from "react";
import { generateStream } from "../actions/stremeable";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export default function Home() {
  const [generation, setGeneration] = useState<string>("");

  return (
    <div className="w-full h-full grid">
      <button
        onClick={async () => {
          const { output } = await generateStream(
            "Create a short press release for a new product launch. Make it about a new wind turbine from Vestas which has high performance capabilities"
          );

          for await (const delta of readStreamableValue(output)) {
            setGeneration(
              (currentGeneration) => `${currentGeneration}${delta}`
            );
          }
        }}
      >
        Ask
      </button>
      <Editor
        sectionID="editor"
        wrapperClassName="bg-white w=full h-full rounded-lg xl:w-1/2 margin-auto"
        content={mutateApiResponse(generation)}
      />
    </div>
  );
}
