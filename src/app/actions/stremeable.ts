"use server";

import { inngest } from "@/inngest/client";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";

export async function generateStream(input: string) {
  console.log("Generating stream with input:", input);
  const stream = createStreamableValue("");
  let buffer = "";

  const { textStream } = await streamText({
    model: openai("gpt-3.5-turbo"),
    prompt: input,
  });

  for await (const delta of textStream) {
    buffer += delta;

    // Split buffer into words and append each word individually
    const words = buffer.split(" ");
    for (let i = 0; i < words.length - 1; i++) {
      const word = words[i] + " ";
      stream.append(word);

      await inngest.send({
        name: "generate/stream-press-release",
        data: { chunk: word },
      });
    }

    // Keep the last word in the buffer (it might be incomplete)
    buffer = words[words.length - 1];
  }

  if (buffer) {
    // Append any remaining buffer content
    stream.append(buffer);

    await inngest.send({
      name: "generate/stream-press-release",
      data: { chunk: buffer },
    });
  }

  await stream.done();

  return { output: stream.value };
}
