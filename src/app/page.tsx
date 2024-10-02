"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PressReleaseGenerator() {
  const [userInput, setUserInput] = useState<string>("");
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleGenerate = async () => {
    if (userInput.trim().length < 10) {
      alert("Please enter a prompt with at least 10 characters.");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch(`/api/press-release`, {
        method: "POST",
        body: JSON.stringify({ prompt: userInput }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { id } = await response.json();
      router.push(`/press-release/${id}`);
    } catch (error) {
      console.error("Error generating press release:", error);
      alert(
        "An error occurred while generating the press release. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

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
        disabled={isGenerating || userInput.trim().length < 10}
      >
        {isGenerating ? "Generating..." : "Generate Press Release"}
      </Button>
    </div>
  );
}
