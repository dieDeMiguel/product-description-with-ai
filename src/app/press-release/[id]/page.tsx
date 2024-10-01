"use client";
import { getKeywords } from "@/ai/keywords";
import Editor from "@/components/editor/editor";
import { FileUploadButton } from "@/components/image-uploader/image-uploader";
import { Badge } from "@/components/ui/badge";
import { PressReleaseAsset } from "@/db";
import { v4 as uuidv4 } from "uuid";

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
  const [enableCaptionQuery, setEnableCaptionQuery] = useState(true);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [image, setImage] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [imageWasUploaded, setImageWasUploaded] = useState(false);
  const [title, setTitle] = useState([
    {
      type: "paragraph",
      data: {
        text: "",
      },
      id: uuidv4(),
    },
  ]);

  const { id } = params;
  const refetchInterval = 600;

  const { data } = useQuery<PressReleaseAsset | null>({
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
    if (data?.image) {
      setImage(data.image);
    }
    if (data?.image_caption) {
      setImageCaption(data.image_caption);
    }
    setEnablePressReleaseQuery(!data?.pressrelease_completed);
  }, [data]);

  const editorBlocks = useEditorBlocks(data);

  useEffect(() => {
    if (enablePressReleaseQuery) return;
    const generateKeywords = async () => {
      try {
        const { title, keywords } = await getKeywords(
          data?.pressrelease || "",
          id
        );
        setTitle((prevTitle) => [
          {
            ...prevTitle[0],
            data: {
              ...prevTitle[0].data,
              text: title,
            },
          },
        ]);
        setKeywords(keywords);
      } catch (error) {
        console.error("Error generating keywords:", error);
      }
    };
    generateKeywords();
  }, [data?.pressrelease, enablePressReleaseQuery]);

  const { data: imageData } = useQuery<PressReleaseAsset | null>({
    queryKey: ["caption", id],
    queryFn: async () => {
      const text = await fetch(`/api/press-release/get-press-release?id=${id}`);
      const result = await text.json();
      return result.pressRelease;
    },
    refetchInterval: refetchInterval,
    enabled: imageWasUploaded && enableCaptionQuery,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    retry: 2,
  });

  useEffect(() => {
    setEnableCaptionQuery(!imageData?.image_caption_completed);
    if (!imageData?.image && !imageData?.image_caption) return;
    setImage(imageData?.image || "");
    setImageCaption(imageData?.image_caption || "");
  }, [imageData]);

  return (
    <div className="w-3/4 w-[900px] px-14 shadow-md h-full overflow-auto">
      <div className="bg-white py-8 px-6 h-full rounded-lg">
        <Editor
          sectionID="title"
          data={title}
          wrapperClassName=""
          className="text-2xl font-bold"
          isReadOnly={false}
        />
        <Editor
          sectionID="editor"
          data={editorBlocks}
          wrapperClassName=""
          className="editor-content"
          isReadOnly={!data?.pressrelease_completed}
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
        <div className="px-6 w-full text-center">
          {image ? (
            <div>
              <Image
                src={image}
                width={300}
                height={200}
                alt="Generated press release image"
                className="w-full"
              />
              <p className="text-center text-sm text-gray-500">
                {imageCaption}
              </p>
            </div>
          ) : (
            <FileUploadButton
              className={"mt-20"}
              id={id}
              setImageWasUploaded={setImageWasUploaded}
              pressRelease={data?.pressrelease || ""}
            />
          )}
        </div>
      </div>
    </div>
  );
}
