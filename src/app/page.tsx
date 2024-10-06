"use client";

import { Button } from "@/components/ui/button";
import Stepper from "@/components/ui/stepper";
import { Textarea } from "@/components/ui/textarea";
import GenieLamp from "@/public/genie-lamp.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSubmitPressRelease } from "@/hooks/useSubmitPressRelease";
import { PressReleaseSchema } from "@/schemas/text-area-schema";

type PressReleaseFormData = z.infer<typeof PressReleaseSchema>;

export default function PressReleaseGenerator() {
  const form = useForm<PressReleaseFormData>({
    resolver: zodResolver(PressReleaseSchema),
    defaultValues: {
      userInput: "",
    },
  });

  const { handleSubmit, formState } = form;
  const { isSubmitting } = formState;

  const { onSubmit, isLoading, currentStep } = useSubmitPressRelease();

  if (isLoading) {
    return <Stepper currentStep={currentStep} />;
  }

  return (
    <div className="w-full sm:w-1/3 p-4 flex flex-col gap-xl h-screen items-center justify-around">
      <div className="w-full">
        <div className="flex items-center h-20">
          <h1 className="text-2xl font-bold">Press Release Genie</h1>
          <GenieLamp
            style={{ width: 50, height: 50, marginBottom: 10 }}
            alt="genie lamp"
          />
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
            <FormField
              control={form.control}
              name="userInput"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Briefly describe the content of your press release.
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What is your press release about? Any language will work :) Minimum 10 characters"
                      className="h-40 resize-none"
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
              {isSubmitting ? "Generating..." : "Generate Press Release"}
            </Button>
          </form>
        </Form>
      </div>
      <Link
        href="/impressum"
        className="text-gray-400 hover:text-white cursor-pointer"
      >
        Impressum
      </Link>
    </div>
  );
}
