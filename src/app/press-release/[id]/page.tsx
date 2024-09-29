"use client";
import Editor from "@/components/editor";
import { PressRelease } from "@/db";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [enabled, setEnabled] = useState(true);
  const { id } = params;
  const refetchInterval = 2000;

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

  return (
    <div className="w-3/4 py-[50px] bg-white rounded-lg p-4 shadow-md h-full overflow-auto">
      <Editor sectionID="editor" wrapperClassName="h-full" data={[]} />
    </div>
  );
}
