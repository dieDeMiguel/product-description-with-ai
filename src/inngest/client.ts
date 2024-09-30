import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "my-app",
  eventKey: process.env.INNGEST_API_KEY,
});
