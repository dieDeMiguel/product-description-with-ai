import { generateKeywords } from "@/ai/keywords";
import { inngest } from "@/inngest/client";

export const throttleGenerateKeywords = inngest.createFunction(
  {
    id: "generate-keywords",
    throttle: { limit: 1, period: "2s", burst: 2 },
  },
  { event: "generate/keywords" },
  async ({ event, step }) => {
    const { prompt, id } = event.data;
    const keywords = await step.run("generate-keywords", async () => {
      return await generateKeywords(prompt, id);
    });

    return keywords;
  }
);
