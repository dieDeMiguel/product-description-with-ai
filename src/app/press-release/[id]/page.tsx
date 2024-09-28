"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PressReleaseDisplay() {
  const { id } = useParams();
  const [generatedText, setGeneratedText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPressRelease = async () => {
      try {
        const response = await fetch(`/api/get-press-release?id=${id}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch press release.");
        }

        const data = await response.json();
        setGeneratedText(data.text);
      } catch (error) {
        console.error("Error fetching press release:", error);
        setGeneratedText("An error occurred while fetching the press release.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPressRelease();
  }, [id]);

  return (
    <div className="w-full max-w-6xl p-4">
      <div className="mb-5">
        <Link href="/">
          <Button>Generate Another Press Release</Button>
        </Link>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <h3 className="content whitespace-pre-wrap">{generatedText}</h3>
      )}
    </div>
  );
}
