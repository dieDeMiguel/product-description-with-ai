import { pressRelease } from "@/ai/press-release";
import { inngest } from "@/inngest/client";

export const throttledStream = inngest.createFunction(
  { id: "throttled-stream", throttle: { limit: 1, period: "1s", burst: 2 } },
  { event: "generate/stream-press-release" },
  async ({ event, step }) => {
    const { prompt } = event.data;
    const reviewPromise = step.run("generate-press-release", async () => {
      return await pressRelease(prompt);
    });
    return reviewPromise;
  }
);
