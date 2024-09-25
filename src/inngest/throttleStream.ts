import { inngest } from "@/inngest/client";

export const throttledStream = inngest.createFunction(
  { id: "throttled-stream", throttle: { limit: 1, period: "0.1s", burst: 2 } },
  { event: "generate/stream-press-release" },
  async ({ event, step }) => {
    const { chunk } = event.data;
    await step.run("Update Stream", async () => {
      console.log("Updating stream with:", chunk);
    });
  }
);
