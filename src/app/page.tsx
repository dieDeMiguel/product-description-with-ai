"use client";

import { Button } from "@/components/ui/button";
import { PressReleaseGeneratorSkeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PressReleaseGenerator() {
  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleGenerate = async () => {
    setIsLoading(true);
    // try {
    const response = await fetch(`/api/press-release`, {
      method: "POST",
      body: JSON.stringify({ prompt: userInput }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("response", response);
    const { id } = await response.json();
    console.log("Press Release ID:", id);
    router.push(`/press-release/${id}`);
    setIsLoading(false);
    // } catch (error) {
    //   console.log("Error generating press release:", error);
    //   if (error instanceof Error) {
    //     alert(
    //       `Something went wrong while generating the press release. Please try again: ${error.message}`
    //     );
    //   } else {
    //     alert(
    //       "Something went wrong while generating the press release. Please try again."
    //     );
    //   }
    // } finally {
    //   setIsLoading(false);
    // }
  };

  if (isLoading) {
    return <PressReleaseGeneratorSkeleton />;
  }

  return (
    <div className="w-full max-w-4xl p-4 flex flex-col gap-xl">
      <h1 className="text-2xl font-bold mb-4">Press Release Generator</h1>
      <Textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="What's your press release about? Any language will work : ) Min 10 characters"
        className="h-40 resize-none mb-4"
      />
      <Button
        onClick={handleGenerate}
        className="w-full"
        disabled={userInput.trim().length < 10}
      >
        Generate Press Release
      </Button>
    </div>
  );
}
