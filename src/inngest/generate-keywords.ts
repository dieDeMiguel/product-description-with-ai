import { pressRelease } from "@/ai/press-release";
import { inngest } from "@/inngest/client";

export const generateKeywords = inngest.createFunction(
  {
    id: "generate-keywords",
    throttle: { limit: 1, period: "2s", burst: 2 },
  },
  { event: "generate/keywords" },
  async ({ event, step }) => {
    const { id, prompt } = event.data;
    const reviewPromise = await step.run("add-press-release", async () => {
      return await pressRelease(id, prompt);
    });
    return reviewPromise;
  }
);
