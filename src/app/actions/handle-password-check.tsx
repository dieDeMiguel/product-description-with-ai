"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: Record<string, string>;
  success?: boolean;
};

const PasswordSchema = z
  .object({
    password: z.string().min(1, "Password is required"),
  })
  .refine(
    (data) => {
      console.log(process.env.ADMIN_PASSWORD, data.password);
      if (!process.env.ADMIN_PASSWORD) {
        console.error(
          "ADMIN_PASSWORD is not defined in environment variables."
        );
        return false;
      }
      return data.password === process.env.ADMIN_PASSWORD;
    },
    {
      message: "Incorrect password",
      path: ["password"],
    }
  );

export async function checkPassword(formData: FormData): Promise<FormState> {
  const parsed = PasswordSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  console.log(parsed);

  if (!parsed.success) {
    const fieldIssues: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const fieldName = issue.path[0] as string;
      fieldIssues[fieldName] = issue.message;
    }

    return {
      message: "One or more form fields are invalid",
      issues: fieldIssues,
    };
  }

  redirect("/genie");

  return { message: "Password verified successfully", success: true };
}
