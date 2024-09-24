"use server";

import { inngest } from "@/ingest/client";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { serve } from "inngest/next";

// Define the throttled stream function
const throttledStream = inngest.createFunction(
  { id: "throttled-stream", throttle: { limit: 1, period: "0.1s", burst: 2 } },
  { event: "generate/stream-press-release" },
  async ({ event, step }) => {
    const { chunk } = event.data;
    await step.run("Update Stream", async () => {
      console.log("Updating stream with:", chunk);
    });
  }
);

export const streamHandler = serve({
  client: inngest,
  functions: [throttledStream],
});

export async function generateStream(input: string) {
  const stream = createStreamableValue("");
  let buffer = "";

  const { textStream } = await streamText({
    model: openai("gpt-3.5-turbo"),
    prompt: input,
  });

  for await (const delta of textStream) {
    buffer += delta;

    // Send the buffer to Inngest for throttled processing
    await inngest.send({
      name: "Throttled Stream",
      data: { chunk: buffer },
    });

    // Clear the buffer after sending
    buffer = "";
  }

  // Ensure any remaining buffered content is sent
  if (buffer) {
    await inngest.send({
      name: "Throttled Stream",
      data: { chunk: buffer },
    });
  }

  await stream.done();

  return { output: stream.value };
}
