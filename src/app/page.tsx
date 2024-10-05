"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PressReleaseGeneratorSkeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PressReleaseGenerator() {
  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleGenerate = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/press-release`, {
      method: "POST",
      body: JSON.stringify({ prompt: userInput }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { id } = await response.json();
    router.push(`/press-release/${id}`);
  };

  if (isLoading) {
    return <PressReleaseGeneratorSkeleton />;
  }

  return (
    <div className="w-full max-w-4xl p-4 flex flex-col gap-xl h-screen items-center justify-around">
      <div>
        <h1 className="text-2xl font-bold mb-4">Press Release Generator</h1>
        <Textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="What's your press release about? Any language will work : ) Min 10 characters"
          className="h-40 sm:w-[450px] resize-none mb-4"
        />
        <Button
          onClick={handleGenerate}
          className="w-full"
          disabled={userInput.trim().length < 10}
        >
          Generate Press Release
        </Button>
      </div>
      <Link
        href="/impressum"
        className="bg-white px-2 py-1 rounded-lg text-black "
      >
        <Label htmlFor="/impressum" className="cursor-pointer">
          Impressum
        </Label>
      </Link>
    </div>
  );
}
