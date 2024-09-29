"use client";
import { PressRelease } from "@/db";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

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

  useEffect(() => {
    console.log("data?.pressRelease_completed", data);
    setEnabled(!data?.pressrelease_completed);
  }, [data]);

  return (
    <div className="flex gap-4">
      <h3 className="text-white">Your Press Release</h3>
      <Markdown className="mt-4">{data?.pressrelease}</Markdown>
    </div>
  );
}
