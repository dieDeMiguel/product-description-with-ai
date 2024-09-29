"use client";
import Editor from "@/components/editor";
import { PressRelease } from "@/db";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [enabled, setEnabled] = useState(true);
  const { id } = params;
  const refetchInterval = 1000;

  const { data } = useQuery<PressRelease | null>({
    queryKey: ["pressRelease", id],
    queryFn: async () => {
      const response = await fetch(`/api/get-press-release?id=${id}`);
      const result = await response.json();
      return result.text;
    },
    refetchInterval: refetchInterval,
    enabled,
  });

  useEffect(() => {
    setEnabled(!data?.pressrelease_completed);
  }, [data]);

  // Memoize the block data
  const editorBlocks = useMemo(() => {
    if (data?.pressrelease) {
      return [
        {
          type: "paragraph",
          data: {
            text: data.pressrelease || "",
          },
          id: uuidv4(), // Consider using a stable ID if possible
        },
      ];
    } else {
      return [
        {
          type: "paragraph",
          data: {
            text: "",
          },
          id: uuidv4(),
        },
      ];
    }
  }, [data?.pressrelease]);

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
