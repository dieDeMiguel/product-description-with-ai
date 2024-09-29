import { inngest } from "@/inngest/client";
import { generatePressRelease } from "@/inngest/generate-press-release";
import { serve } from "inngest/next";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [generatePressRelease],
});
