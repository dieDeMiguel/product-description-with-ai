"use client";
import Editor from "@/components/editor/editor";
import { FileUploadButton } from "@/components/image-uploader/image-uploader";
import { Badge } from "@/components/ui/badge";
import { Keywords, PressReleaseImage } from "@/db";
import { inngest } from "@/inngest/client";
import useEditorBlocks from "@/utils/editor/memoise-editor-block";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [enablePressReleaseQuery, setEnablePressReleaseQuery] = useState(true);
  const [enableKeywordsQuery, setEnableKeywordsQuery] = useState(false);
  const [keywordsId, setKeywordsId] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [image, setImage] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [imageWasUploaded, setImageWasUploaded] = useState(false);

  const { id } = params;
  const refetchInterval = 400;

  useEffect(() => {
    const fetchData = async () => {
      if (imageWasUploaded) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const text = await fetch(
          `/api/press-release/get-press-release?id=${id}`
        );
        const result = await text.json();
        setImage(result.pressRelease.image);
        setImageCaption(result.pressRelease.image_caption);
      }
    };
    fetchData();
  }, [imageWasUploaded]);

  const { data } = useQuery<PressReleaseImage | null>({
    queryKey: ["pressRelease", id],
    queryFn: async () => {
      const text = await fetch(`/api/press-release/get-press-release?id=${id}`);
      const result = await text.json();
      return result.pressRelease;
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

  const { data: keywordsData } = useQuery<Keywords | null>({
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
    setEnableKeywordsQuery(!keywordsData?.keywords_completed);
  }, [keywordsData]);

  useEffect(() => {
    if (!keywordsData) return;
    const keywordsList = keywordsData.keywords.split(",");
    setKeywords(keywordsList);
  }, [keywordsData]);

  return (
    <div className="w-3/4 lg:w-1/2 p-4 shadow-md h-full overflow-auto">
      <FileUploadButton
        className={"mb-xxl"}
        id={id}
        setImageWasUploaded={setImageWasUploaded}
      />
      <div className="py-[50px] bg-white p-4 h-full rounded-lg">
        <Editor
          sectionID="editor"
          data={editorBlocks}
          wrapperClassName="editor-wrapper"
          className="editor-content"
        />
        <div className="py-4">
          <div className="py-4">
            {keywords?.length > 0 && (
              <ul className="text-black list-disc pl-5">
                {keywords.map((keyword, index) => (
                  <Badge className="inline-block mx-1" key={index}>
                    {keyword}
                  </Badge>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="image-container">
          {image && (
            <Image
              src={image}
              width={300}
              height={200}
              alt="Generated press release image"
              className="w-full"
            />
          )}
          {imageCaption && (
            <p className="text-center text-sm text-gray-500">{imageCaption}</p>
          )}
        </div>
      </div>
    </div>
  );
}
