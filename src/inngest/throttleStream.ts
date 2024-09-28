import { pressRelease } from "@/ai/press-release";
import { inngest } from "@/inngest/client";
import {
  appendGeneratedPressRelease,
  markPressReleaseComplete,
} from "@/store/pressReleaseStore";

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

    try {
      const stream = pressRelease(prompt);

      for await (const word of stream) {
        appendGeneratedPressRelease(id, word); // Append each word to the store
      }

      // Mark the press release generation as complete once the stream ends
      markPressReleaseComplete(id);
      console.log(`Press release ${id} marked as complete`);
    } catch (error) {
      console.error("Error in Inngest function:", error);
      throw error;
    }

    return { id };
  }
);
