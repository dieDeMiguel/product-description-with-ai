"use client";

import { readStreamableValue } from "ai/rsc";
import { useEffect, useRef, useState } from "react";
import { generateStream } from "../actions/stremeable";

import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EditorHandle } from "@/interfaces/editorHandle";
import { debounce } from "lodash";

export const maxDuration = 50;
const baseInstruction =
  "Create a press release for the German market. Avoid including 'for immediate release' and any contact information at the end. The press release is about:";

export default function Home() {
  const editorInstance = useRef<EditorHandle | null>(null);
  const paragraphBuffer = useRef<string>("");
  const [userInput, setUserInput] = useState<string>("");

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
      const prompt = `${baseInstruction} ${userInput}`;
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
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="The press release is about..."
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
