import { inngest } from "@/inngest/client";
import { throttledStream } from "@/inngest/throttleStream";
import { serve } from "inngest/next";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [throttledStream],
});
