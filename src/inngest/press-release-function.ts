import { pressRelease } from "@/ai/press-release";
import { inngest } from "@/inngest/client";
import { appendGeneratedPressRelease } from "@/store/pressReleaseStore";

export const pressReleaseFunction = inngest.createFunction(
  {
    id: "generate-press-release",
    throttle: { limit: 1, period: "1s", burst: 2 },
  },
  { event: "generate/press-release" },
  async ({ event }) => {
    const { prompt, id } = event.data;

    if (!prompt || !id) {
      throw new Error("Missing prompt or identifier.");
    }

    const generatedText = await pressRelease(prompt);

    // Update the in-memory store
    appendGeneratedPressRelease(id, generatedText);

    return { id, text: generatedText };
  }
);
