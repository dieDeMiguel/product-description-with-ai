import { pressRelease } from "@/ai/press-release";
import { inngest } from "@/inngest/client";

export const generatePressRelease = inngest.createFunction(
  {
    id: "generate-press-release",
    throttle: { limit: 1, period: "2s", burst: 2 },
  },
  { event: "generate/press-release" },
  async ({ event, step }) => {
    const { id, prompt } = event.data;
    const reviewPromise = await step.run("add-press-release", async () => {
      return await pressRelease(id, prompt);
    });
    return reviewPromise;
  }
);
