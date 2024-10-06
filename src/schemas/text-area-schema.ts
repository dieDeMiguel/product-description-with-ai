import { z } from "zod";

export const PressReleaseSchema = z.object({
  userInput: z
    .string()
    .min(10, {
      message: "The description must be at least 10 characters long.",
    })
    .max(1000, { message: "The description must not exceed 1000 characters." }),
});
