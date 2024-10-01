import { inngest } from "@/inngest/client";
import { throttleGenerateImageCaption } from "@/inngest/generate-image-caption";
import { throttleGeneratePressRelease } from "@/inngest/generate-press-release";
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [throttleGeneratePressRelease, throttleGenerateImageCaption],
});
