// pages/index.tsx
"use client";

import Editor from "@/components/editor";
import { readStreamableValue } from "ai/rsc";
import { debounce } from "lodash";
import { useEffect, useRef } from "react";
import { generateStream } from "../actions/stremeable";

export const maxDuration = 30;

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorInstance = useRef<any>(null);
  const paragraphBuffer = useRef<string>("");

  const appendTextDebounced = useRef(
    debounce(async () => {
      if (paragraphBuffer.current.trim() !== "") {
        if (editorInstance.current) {
          try {
            await editorInstance.current.appendText(paragraphBuffer.current);
            paragraphBuffer.current = "";
          } catch (error) {
            console.error("Error appending text:", error);
          }
        }
      }
    }, 130)
  ).current;

  const handleStream = async () => {
    const { output } = await generateStream(
      "Create a short press release for a new product launch. Make it about a new wind turbine from Vestas which has high performance capabilities"
    );

    for await (const delta of readStreamableValue(output)) {
      paragraphBuffer.current += delta;
      appendTextDebounced();
    }

    appendTextDebounced.flush();
  };

  useEffect(() => {
    return () => {
      appendTextDebounced.cancel();
    };
  }, [appendTextDebounced]);

  return (
    <div className="h-full flex flex-col justify-center items-center p-xl gap-l">
      <div className="button">
        <button onClick={handleStream}>Ask</button>
      </div>
      <Editor
        ref={editorInstance}
        sectionID="editor"
        wrapperClassName="bg-white w-[730px] h-full rounded-lg margin-auto"
      />
    </div>
  );
}
