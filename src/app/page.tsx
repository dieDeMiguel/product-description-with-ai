"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { checkPassword } from "./actions/handle-password-check";

const PasswordSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

type PasswordFormData = z.infer<typeof PasswordSchema>;

export default function PasswordForm() {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const { handleSubmit, formState, setError } = form;
  const { isSubmitting } = formState;

  const onSubmit: SubmitHandler<PasswordFormData> = async (data) => {
    setServerError(null);

    const formData = new FormData();
    formData.append("password", data.password);
    console.log("formData", formData.get("password"));

    try {
      const response = await checkPassword(formData);
      console.log("response", response);

      if (response?.issues && response?.issues?.password) {
        setError("password", {
          type: "server",
          message: response.issues.password,
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setServerError(error.message || "An unexpected error occurred");
      } else {
        setServerError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 flex flex-col gap-4 h-screen items-center justify-center">
      <h1 className="text-2xl font-bold">Enter Password</h1>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {serverError && (
            <p className="text-red-500 text-center">{serverError}</p>
          )}
          <Button
            type="submit"
            className="w-full font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Checking..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
