"use client";

import Editor from "@/components/editor";
import { readStreamableValue } from "ai/rsc";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";
import { generateStream } from "../actions/stremeable";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EditorHandle } from "@/interfaces/editorHandle";

export const maxDuration = 50;

export default function Home() {
  const editorInstance = useRef<EditorHandle | null>(null);
  const paragraphBuffer = useRef<string>("");
  const [prompt, setPrompt] = useState<string>(
    "Create a short press release for a new product launch. Make it about: A new Tesla Model X electric car."
  );

  const appendTextDebounced = useRef(
    debounce(async () => {
      if (paragraphBuffer?.current?.trim().length > 2) {
        if (editorInstance?.current) {
          try {
            await editorInstance.current.appendText(paragraphBuffer.current);
            paragraphBuffer.current = "";
          } catch (error) {
            console.error("Error appending text:", error);
          }
        }
      }
    }, maxDuration)
  ).current;

  const handleStream = async () => {
    try {
      const { output } = await generateStream(prompt);

      for await (const delta of readStreamableValue(output)) {
        paragraphBuffer.current += delta;
        appendTextDebounced();
      }

      appendTextDebounced.flush();
    } catch (error) {
      console.error("Error generating stream:", error);
    }
  };

  useEffect(() => {
    return () => {
      appendTextDebounced.cancel();
    };
  }, [appendTextDebounced]);

  return (
    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-5 gap-6 p-4">
      <div className="md:col-span-2 flex flex-col gap-4">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Escribe el prompt para la nota de prensa..."
          className="h-40 resize-none"
        />
        <Button onClick={handleStream} className="w-full">
          Generate
        </Button>
      </div>
      <div className="md:col-span-3 bg-white rounded-lg p-4 shadow-md h-full overflow-auto">
        <Editor
          ref={editorInstance}
          sectionID="editor"
          wrapperClassName="h-full"
        />
      </div>
    </div>
  );
}
