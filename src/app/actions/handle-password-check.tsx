"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: Record<string, string>;
};

const PasswordSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export async function checkPassword(formData: FormData): Promise<FormState> {
  const data = Object.fromEntries(formData.entries());
  const parsed = PasswordSchema.safeParse(data);

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

  const { password } = parsed.data;

  // TODO: Replace this with your actual password verification logic
  const isPasswordCorrect = password === "expectedPassword";

  if (isPasswordCorrect) {
    redirect("/genie");
  } else {
    return {
      message: "Incorrect password",
      issues: {
        password: "Incorrect password",
      },
    };
  }
}
