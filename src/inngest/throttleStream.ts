import { pressRelease } from "@/ai/press-release";
import { inngest } from "@/inngest/client";

export const throttledStream = inngest.createFunction(
  {
    id: "throttled-stream",
    throttle: { limit: 5, period: "5s", burst: 2 },
  },
  { event: "generate/press-release" },
  async ({ event, step }) => {
    const { id, prompt } = event.data;
    const reviewPromise = await step.run("add-press-release", async () => {
      console.log("Throttled Stream function 123456:", event.data);
      return await pressRelease(id, prompt);
    });
    return reviewPromise;
  }
);
