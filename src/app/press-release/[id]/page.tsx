"use client";
import Editor from "@/components/editor";
import { PressRelease } from "@/db";
import { EditorHandle } from "@/interfaces/editorHandle";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [enabled, setEnabled] = useState(true);
  const { id } = params;

  const { data } = useQuery<PressRelease | null>({
    queryKey: ["pressRelease", id],
    queryFn: async () => {
      const response = await fetch(`/api/get-press-release?id=${id}`);
      const result = await response.json();
      return result.text;
    },
    refetchInterval: 200,
    enabled,
  });

  const editorInstance = useRef<EditorHandle | null>(null);
  const paragraphBuffer = useRef<string>("");
  const maxDuration = 50;

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

  useEffect(() => {
    return () => {
      appendTextDebounced.cancel();
    };
  }, [appendTextDebounced]);

  useEffect(() => {
    setEnabled(!data?.pressrelease_completed);
    paragraphBuffer.current += data?.pressrelease || "";
    if (!enabled) appendTextDebounced.flush();
  }, [data]);

  return (
    <div className="w-3/4 py-[50px] bg-white rounded-lg p-4 shadow-md h-full overflow-auto">
      <Editor
        ref={editorInstance}
        sectionID="editor"
        wrapperClassName="h-full"
      />
    </div>
  );
}
