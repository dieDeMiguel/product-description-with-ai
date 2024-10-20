import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

const ProductDescriptionSchema = z.object({
  userInput: z.string().min(10, "Minimum 10 characters required"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms",
  }),
});

type FormData = z.infer<typeof ProductDescriptionSchema>;

interface FormProps {
  onSubmit: (data: FormData) => void;
  isSubmitting: boolean;
}

export default function FormComponent({ onSubmit, isSubmitting }: FormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(ProductDescriptionSchema),
    defaultValues: {
      userInput:
        "A new tesla model X with ultra efficient rotor and stator cutting edge technology and 20k cycle lithium battery",
      terms: false,
    },
  });

  const { handleSubmit, formState } = form;
  const { errors } = formState;

  return (
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
              <FormMessage>{errors.userInput?.message}</FormMessage>
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
                  product description generator. See &apos;Impressum&apos; for
                  more information.
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
          {isSubmitting ? "Generating..." : "Generate a Product Description"}
        </Button>
      </form>
    </Form>
  );
}
