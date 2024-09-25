"use server";

import { inngest } from "@/inngest/client";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";

export async function generateStream(input: string) {
  const stream = createStreamableValue("");
  let buffer = "";

  const { textStream } = await streamText({
    model: openai("gpt-3.5-turbo"),
    prompt: input,
  });

  for await (const delta of textStream) {
    buffer += delta;

    await inngest.send({
      name: "generate/stream-press-release",
      data: { chunk: buffer },
    });

    buffer = "";
  }

  if (buffer) {
    await inngest.send({
      name: "generate/stream-press-release",
      data: { chunk: buffer },
    });
  }

  await stream.done();

  return { output: stream.value };
}
