"use client";

import EditorComponent from "@/components/editor/editor-component/editor-component";
import FormComponent from "@/components/form/form";
import Stepper from "@/components/ui/stepper";
import { ProductDescriptionSchema } from "@/schemas/form-schema";
import EditorBlocksSchema from "@/schemas/product-description-schema";
import { OutputBlockData } from "@editorjs/editorjs";
import { experimental_useObject as useObject } from "ai/react";
import { useEffect, useState } from "react";
import { z } from "zod";

type FormData = z.infer<typeof ProductDescriptionSchema>;

export default function ProductDescriptionGenerator() {
  const [step, setStep] = useState<number>(0);
  const [language, setLanguage] = useState<string>("");
  const [editorData, setEditorData] = useState<OutputBlockData[]>([]);
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
    setStep(2);
    const result = await response.json();
    const detectedLanguage = result?.detectedLanguage;
    setLanguage(detectedLanguage);
    const mutableData = { ...data, detectedLanguage };
    submit(mutableData);
  };

  useEffect(() => {
    if (object?.blocks) {
      setEditorData(object.blocks as OutputBlockData[]);
    }
  }, [object?.blocks]);

  return (
    <div className="w-full p-4 flex flex-col gap-xl h-screen items-center justify-around">
      {!isLoading && !object?.blocks && step === 0 && (
        <FormComponent onSubmit={onSubmit} />
      )}
      {editorData.length ? (
        <EditorComponent
          editorData={editorData}
          isLoading={isLoading}
          stop={stop}
          language={language}
          setStep={setStep}
          setEditorData={setEditorData}
        />
      ) : step > 0 ? (
        <Stepper currentStep={step} />
      ) : null}
    </div>
  );
}
