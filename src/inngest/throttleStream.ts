import { pressRelease } from "@/ai/press-release";
import { inngest } from "@/inngest/client";
import { appendGeneratedPressRelease } from "@/store/pressReleaseStore";
import { readStreamableValue } from "ai/rsc";

export const throttledStream = inngest.createFunction(
  { id: "throttled-stream", throttle: { limit: 1, period: "1s", burst: 2 } },
  { event: "generate/press-release" },
  async ({ event, step }) => {
    const { id, prompt } = event.data;
    const reviewPromise = await step.run("generate-press-release", async () => {
      const { output } = await pressRelease(prompt);
      for await (const delta of readStreamableValue(output)) {
        appendGeneratedPressRelease(id, delta);
      }
    });
    return reviewPromise;
  }
);
