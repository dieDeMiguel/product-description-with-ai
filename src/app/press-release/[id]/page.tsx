"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PressReleaseDisplay() {
  const { id } = useParams();
  const [generatedText, setGeneratedText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Missing identifier.");
      setIsLoading(false);
      return;
    }

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/get-press-release?id=${id}`);

        if (!response.ok) {
          const errorData = await response.json();
          if (
            errorData.error === "Press release not found or not yet generated."
          ) {
            // Continue polling
            return;
          }
          throw new Error(errorData.error || "Failed to fetch press release.");
        }

        const data = await response.json();
        setGeneratedText(data.text);

        // If the generation is complete, stop the polling
        if (data.isComplete) {
          setIsComplete(true);
          clearInterval(interval);
        }

        // Once we have some text, mark loading as false
        if (data.text) {
          setIsLoading(false);
        }
      } catch (err: unknown) {
        console.error("Error fetching press release:", err);
        if (err instanceof Error) {
          setError(
            err.message || "An error occurred while fetching the press release."
          );
        } else {
          setError(
            "An unknown error occurred while fetching the press release."
          );
        }
        setIsLoading(false); // Stop loading on error
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [id]);

  return (
    <div className="w-full max-w-6xl p-4">
      <div className="mb-5">
        <Link href="/press-release-generator">
          <Button>Generate Another Press Release</Button>
        </Link>
      </div>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3 className="content whitespace-pre-wrap">
            {generatedText || "Generating..."}
          </h3>
          {isComplete && (
            <p className="mt-4 text-green-500">Generation Complete!</p>
          )}
        </>
      )}
    </div>
  );
}
