import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "my-app",
  apiKey: process.env.NEXT_PUBLIC_INNGEST_API_KEY,
});
