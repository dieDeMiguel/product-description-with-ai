"use client";

import EditorComponent from "@/components/editor/editor-component/editor-component";
import FormComponent from "@/components/form/form";
import Stepper from "@/components/ui/stepper";
import { ProductDescriptionSchema } from "@/schemas/form-schema";
import EditorBlocksSchema from "@/schemas/product-description-schema";
import { OutputBlockData } from "@editorjs/editorjs";
import { experimental_useObject as useObject } from "ai/react";
import { useState } from "react";
import { z } from "zod";

type FormData = z.infer<typeof ProductDescriptionSchema>;

export default function ProductDescriptionGenerator() {
  const [step, setStep] = useState<number>(0);
  const { object, submit, isLoading, stop } = useObject({
    api: "/api/generate-product-description",
    schema: EditorBlocksSchema,
  });

  const onSubmit = async (data: FormData) => {
    setStep(1);
    const response = await fetch("/api/detect-language", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput: data.userInput }),
    });

    const result = await response.json();
    const detectedLanguage = result?.detectedLanguage;
    const mutableData = { ...data, detectedLanguage };
    setStep(2);
    await submit(mutableData);
  };

  return (
    <div className="w-full sm:w-2/3 lg:1/2 p-4 flex flex-col gap-xl h-screen items-center justify-around">
      {!isLoading && step === 0 && (
        <FormComponent onSubmit={onSubmit} isSubmitting={isLoading} />
      )}
      {object?.blocks ? (
        <EditorComponent
          editorData={object.blocks as OutputBlockData[]}
          isLoading={isLoading}
          stop={stop}
        />
      ) : step > 0 ? (
        <Stepper currentStep={step} />
      ) : null}
    </div>
  );
}
