"use server";

import { z } from "zod";

export const passwordSchema = z
  .object({
    password: z.string().min(1, "Password is required"),
  })
  .refine(
    (data) => {
      if (!process.env.ACCESS_PASSWORD) {
        console.error(
          "ACCESS_PASSWORD is not defined in environment variables."
        );
        return false;
      }
      return data.password === process.env.ACCESS_PASSWORD;
    },
    {
      message: "Incorrect password",
      path: ["password"],
    }
  );
