"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Stepper from "@/components/ui/stepper";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitProductDescription } from "@/hooks/useSubmitPressRelease";
import GenieLamp from "@/public/genie-lamp.svg";
import { PressReleaseSchema } from "@/schemas/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

type PressReleaseFormData = z.infer<typeof PressReleaseSchema>;

export default function ProductDescriptionGenerator() {
  const form = useForm<PressReleaseFormData>({
    resolver: zodResolver(PressReleaseSchema),
    defaultValues: {
      userInput: "",
    },
  });

  const { handleSubmit, formState } = form;
  const { isSubmitting } = formState;

  const { onSubmit, isLoading, currentStep } = useSubmitProductDescription();

  if (isLoading) {
    return <Stepper currentStep={currentStep} />;
  }

  return (
    <div className="w-full max-w-maxWidthEditorCanvas sm:w-2/3 lg:1/2 p-4 flex flex-col gap-xl h-screen items-center justify-around">
      <div className="w-full">
        <div className="flex items-center h-20">
          <h1 className="text-2xl font-bold">Product Description Generator</h1>
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
                  <FormLabel>Describe your product.</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What is your product about? Any language will work :) Minimum 10 characters"
                      className="h-40 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="terms"
              render={({ field, fieldState: { error } }) => {
                const { value, ...restValues } = field;
                return (
                  <FormItem className="flex items-end space-x-2">
                    <FormControl>
                      <Checkbox
                        {...restValues}
                        id="terms"
                        checked={value}
                        onCheckedChange={field.onChange}
                        className={error ? "mb-s" : ""}
                      />
                    </FormControl>
                    <FormLabel htmlFor="terms" className="!my-0">
                      I understand that this is a demo project and not a real
                      product description generator. See &apos;Impressum&apos;
                      for more information.
                    </FormLabel>
                    <FormMessage>{error?.message}</FormMessage>
                  </FormItem>
                );
              }}
            />
            <Button
              type="submit"
              className="w-full font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Generating..."
                : "Generate a Product Description"}
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
