import { helloWorld } from "@/inngest/function";
import { throttledStream } from "@/inngest/throttleStream";
import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [helloWorld, throttledStream],
});
