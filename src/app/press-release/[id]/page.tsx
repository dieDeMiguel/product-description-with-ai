"use client";

import { getGeneratedPressRelease } from "@/store/pressReleaseStore"; // Simulated store
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PressReleaseDisplay() {
  let { id } = useParams();
  if (Array.isArray(id)) {
    id = id[0];
  }
  const [generatedText, setGeneratedText] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Missing identifier.");
      setIsLoading(false);
      return;
    }

    const pollData = async () => {
      try {
        const result = getGeneratedPressRelease(id);

        if (result) {
          setGeneratedText(result.text);

          if (result.isComplete) {
            console.log("Generation complete! Stopping polling...");
            setIsComplete(true);
            clearInterval(intervalId); // Stop polling when complete
            setIsLoading(false);
          }
        } else {
          setError("Press release not found or not yet generated.");
        }
      } catch {
        setError("Error fetching press release.");
        clearInterval(intervalId);
      }
    };

    // Poll every 500ms to simulate real-time updates
    const intervalId = setInterval(pollData, 500);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
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
            {generatedText || "Press release is still being generated..."}
          </h3>
          {isComplete && (
            <p className="mt-4 text-green-500">Generation Complete!</p>
          )}
        </>
      )}
    </div>
  );
}
