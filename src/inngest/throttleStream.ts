import { pressRelease } from "@/ai/press-release";
import { inngest } from "@/inngest/client";
import { appendGeneratedPressRelease } from "@/store/pressReleaseStore";

export const throttledStream = inngest.createFunction(
  {
    id: "throttled-stream",
    throttle: { limit: 1, period: "1s", burst: 2 },
  },
  { event: "generate/press-release" },
  async ({ event }) => {
    const { id, prompt } = event.data;

    if (!id || !prompt) {
      throw new Error("Missing id or prompt.");
    }

    const stream = pressRelease(prompt);

    for await (const word of stream) {
      appendGeneratedPressRelease(id, word);
    }

    return { id };
  }
);
