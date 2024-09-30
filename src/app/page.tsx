"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { inngest } from "@/inngest/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PressReleaseGenerator() {
  const [userInput, setUserInput] = useState<string>(
    "A new Tesla Model X car with offroad capabilities"
  );
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleGenerate = async () => {
    if (userInput.trim().length < 10) {
      alert("Please enter a prompt with at least 10 characters.");
      return;
    }

    setIsGenerating(true);

    const response = await fetch(`/api/press-release/generate-press-release`, {
      method: "POST",
      body: JSON.stringify({ pressRelease: "" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { id } = await response.json();
    try {
      await inngest.send({
        name: "generate/press-release",
        data: {
          id,
          prompt: userInput,
        },
      });
      router.push(`/press-release/${id}`);
    } catch (error) {
      console.error("Error generating press release:", error);
      alert("An error occurred while generating the press release.");
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
        placeholder="The press release is about..."
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
