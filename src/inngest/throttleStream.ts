import { inngest } from "@/inngest/client";
import { EditorHandle } from "@/interfaces/editorHandle";

export const throttledStream = (editorInstance: EditorHandle | null) =>
  inngest.createFunction(
    { id: "throttled-stream", throttle: { limit: 1, period: "1s", burst: 2 } },
    { event: "generate/stream-press-release" },
    async ({ event, step }) => {
      const { chunk } = event.data;
      await step.run("Update Stream", async () => {
        console.log("Updating stream with:", chunk);
        if (editorInstance) {
          try {
            await editorInstance.appendText(chunk);
          } catch (error) {
            console.error("Error appending text:", error);
          }
        }
      });
    }
  );
