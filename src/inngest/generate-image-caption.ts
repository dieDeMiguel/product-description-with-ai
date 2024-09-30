import { generateImageCaption } from "@/ai/image-caption";
import { inngest } from "@/inngest/client";

export const throttleGenerateImageCaption = inngest.createFunction(
  {
    id: "generate-image-caption",
    throttle: { limit: 1, period: "2s", burst: 2 },
  },
  { event: "generate/image-caption" },
  async ({ event, step }) => {
    const { url, id } = event.data;
    const keywords = await step.run("add-image-caption", async () => {
      return await generateImageCaption(id, url);
    });

    return keywords;
  }
);
