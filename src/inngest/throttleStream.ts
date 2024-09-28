import { pressRelease } from "@/ai/press-release";
import { inngest } from "@/inngest/client";

export const throttledStream = inngest.createFunction(
  { id: "throttled-stream", throttle: { limit: 1, period: "1s", burst: 2 } },
  { event: "generate/press-release" },
  async ({ event, step }) => {
    const { id, prompt } = event.data;
    const reviewPromise = await step.run("generate-press-release", async () => {
      return pressRelease(prompt, id);
    });
    return reviewPromise;
  }
);
