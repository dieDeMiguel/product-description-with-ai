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
import { useRef } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { onSubmitAction } from "./actions/handle-password-check";
import { passwordSchema } from "./schema/schema";

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function PasswordForm() {
  const [state, formAction] = useFormState(onSubmitAction, {
    message: "",
  });

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      ...(state.fields ?? {}),
    },
  });

  const { formState } = form;
  const { isSubmitting } = formState;

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="w-full max-w-md mx-auto p-4 flex flex-col gap-4 h-screen items-center justify-center">
      <h1 className="text-2xl font-bold">Enter Password</h1>
      <Form {...form}>
        {state?.message && !state.issues && (
          <p className="text-red-500 text-center">{state.message}</p>
        )}
        {state?.issues && (
          <div className="text-red-500">
            <ul>
              {state.issues.map((issue, index) => (
                <li className="flex gap-1" key={index}>
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        )}
        <form
          ref={formRef}
          action={formAction}
          onSubmit={(evt) => {
            evt.preventDefault();
            form.handleSubmit(() => {
              formAction(new FormData(formRef.current!));
            })(evt);
          }}
          className="w-full space-y-4"
        >
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
