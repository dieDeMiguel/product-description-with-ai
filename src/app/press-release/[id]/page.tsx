"use client";
import Editor from "@/components/editor/editor";
import { PressRelease } from "@/db";
import { inngest } from "@/inngest/client";
import useEditorBlocks from "@/utils/editor/memoise-editor-block";
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
  const [enableKeywordsQuery, setEnableKeywordsQuery] = useState(true);
  const [keywordsId, setKeywordsId] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);

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
    if (enablePressReleaseQuery) return;
    const sendKeywords = async () => {
      const response = await fetch(`/api/keywords/generate-keywords`, {
        method: "POST",
        body: JSON.stringify({ keywords: "" }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { id } = await response.json();
      setKeywordsId(id);
      try {
        await inngest.send({
          name: "generate/keywords",
          data: {
            prompt: data?.pressrelease,
            id,
          },
        });
        setEnableKeywordsQuery(true);
      } catch (error) {
        console.error("Error generating keywords:", error);
      }
    };
    sendKeywords();
  }, [enablePressReleaseQuery, data?.pressrelease]);

  const editorBlocks = useEditorBlocks(data);

  const { data: keywordsData } = useQuery<string | null>({
    queryKey: ["keywords", keywordsId],
    queryFn: async () => {
      const response = await fetch(
        `/api/keywords/get-keywords?id=${keywordsId}`
      );
      const result = await response.json();
      return result.text;
    },
    refetchInterval: refetchInterval,
    enabled: enableKeywordsQuery && !enablePressReleaseQuery && !!keywordsId,
  });

  useEffect(() => {
    if (!keywordsData) return;
    const keywordsList = keywordsData.split(",");
    setKeywords(keywordsList);
  }, [keywordsData]);

  return (
    <div className="w-3/4 lg:w-1/2 py-[50px] bg-white rounded-lg p-4 shadow-md h-full overflow-auto">
      <Editor
        sectionID="editor"
        data={editorBlocks}
        wrapperClassName="editor-wrapper"
        className="editor-content"
      />
      <div className="py-4">
        {keywords?.length > 0 && (
          <ul className="text-black list-disc pl-5">
            <h2 className="bold underline">Keywords:</h2>
            {keywords.map((keyword, index) => (
              <li className="list-none" key={index}>
                {keyword}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
