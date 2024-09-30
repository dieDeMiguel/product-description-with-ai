"use client";
import Editor from "@/components/editor/editor";
import { FileUploadButton } from "@/components/image-uploader/image-uploader";
import { PressReleaseImage } from "@/db";
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
  const [enableKeywordsQuery, setEnableKeywordsQuery] = useState(true);
  const [keywordsId, setKeywordsId] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [image, setImage] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [imageWasUploaded, setImageWasUploaded] = useState(false);

  const { id } = params;
  const refetchInterval = 400;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (imageWasUploaded) {
  //       const response = await fetch(
  //         `/api/press-release/get-press-release?id=${id}`
  //       );
  //       const result = await response.json();
  //       if (result.image) setImage(result.image);
  //       if (result.image_caption) setImageCaption(result.image_caption);
  //     }
  //   };
  //   fetchData();
  // }, [imageWasUploaded]);

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
        <div className="image-container">
          {image && (
            <Image
              src={image}
              width={400}
              height={300}
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
