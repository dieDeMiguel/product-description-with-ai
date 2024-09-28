"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { inngest } from "@/inngest/client";

export default function Home() {
  const paragraphBuffer = useRef<string>("");
  const [userInput, setUserInput] = useState<string>(
    "A new tesla model x car with offroad capabilities"
  );

  const handleStream = async () => {
    await inngest.send({
      name: "generate/press-release",
      data: {
        prompt: userInput,
      },
    });
  };

  return (
    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-5 gap-6 p-4">
      <div className="md:col-span-2 flex flex-col gap-4">
        <Textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="The press release is about..."
          className="h-40 resize-none"
        />
        <Button onClick={handleStream} className="w-full">
          Generate
        </Button>
      </div>
      <h3 className="content">{paragraphBuffer.current}</h3>
    </div>
  );
}
