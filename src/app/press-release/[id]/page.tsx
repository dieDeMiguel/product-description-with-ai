"use client";
import { Skeleton } from "@/components/ui/skeleton";
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

  const { data, isLoading, error } = useQuery<string | null>({
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
    if (data) {
      setEnabled(false);
    }
  }, [data]);

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return <div>Error loading press release.</div>;
  }

  return (
    <div className="flex gap-4">
      <h3 className="text-white">hello</h3>
      <Markdown className="mt-4">{data}</Markdown>
    </div>
  );
}
