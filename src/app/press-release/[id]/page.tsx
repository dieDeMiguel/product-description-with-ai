"use client";
import Editor from "@/components/editor";
import useEditorBlocks from "@/components/memoise-editor-block";
import { PressRelease } from "@/db";
import { inngest } from "@/inngest/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [enablePressReleaseQuery, setEnablePressReleaseQuery] = useState(true);
  const { id } = params;
  const refetchInterval = 1000;

  const { data } = useQuery<PressRelease | null>({
    queryKey: ["pressRelease", id],
    queryFn: async () => {
      const response = await fetch(
        `/api/press-release/get-press-release?id=${id}`
      );
      const result = await response.json();
      return result.text;
    },
    refetchInterval: refetchInterval,
    enabled: enablePressReleaseQuery,
  });

  useEffect(() => {
    setEnablePressReleaseQuery(!data?.pressrelease_completed);
  }, [data]);

  useEffect(() => {
    const sendKeywords = async () => {
      if (!enablePressReleaseQuery) {
        const response = await fetch(`/api/keywords/generate-keywords`, {
          method: "POST",
          body: JSON.stringify({ pressRelease: "" }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { id } = await response.json();
        try {
          await inngest.send({
            name: "generate/keywords",
            data: {
              prompt: data?.pressrelease,
              id,
            },
          });
        } catch (error) {
          console.error("Error generating keywords:", error);
        }
      }
    };
    sendKeywords();
  }, [enablePressReleaseQuery, data?.pressrelease]);

  const editorBlocks = useEditorBlocks(data);

  return (
    <div className="w-3/4 lg:w-1/2 py-[50px] bg-white rounded-lg p-4 shadow-md h-full overflow-auto">
      <Editor
        sectionID="editor"
        wrapperClassName="h-full"
        data={editorBlocks}
      />
    </div>
  );
}
