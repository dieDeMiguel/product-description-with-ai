"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function PressReleaseGenerator() {
  const [userInput, setUserInput] = useState<string>(
    "A new Tesla Model X car with offroad capabilities"
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (userInput.trim().length < 10) {
      alert("Please enter a prompt with at least 10 characters.");
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate-press-release", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userInput }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate press release.");
      }

      const data = await response.json();
      const { id } = data; // Assume the API returns an identifier

      // Redirect to the display page with the identifier
      router.push(`/press-release/${id}`);
    } catch (error) {
      console.error("Error generating press release:", error);
      alert("An error occurred while generating the press release.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-6xl p-4">
      <h1 className="text-2xl font-bold mb-4">Press Release Generator</h1>
      <Textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="The press release is about..."
        className="h-40 resize-none mb-4"
      />
      <Button onClick={handleSubmit} className="w-full" disabled={isGenerating}>
        {isGenerating ? "Generating..." : "Generate Press Release"}
      </Button>
    </div>
  );
}
