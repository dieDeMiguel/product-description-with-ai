"use client";

import IntermediateComponent from "@/components/editor/intermediate-component/intermediate-component";
import FormComponent from "@/components/form/form";
import Stepper from "@/components/ui/stepper";
import { useAnimatedBlocks } from "@/hooks/useAnimatedBlocks";
import { ProductDescriptionSchema } from "@/schemas/form-schema";
import EditorBlocksSchema from "@/schemas/product-description-schema";
import { OutputBlockData } from "@editorjs/editorjs";
import { experimental_useObject as useObject } from "ai/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { z } from "zod";

type FormData = z.infer<typeof ProductDescriptionSchema>;

export default function Page() {
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

  const animatedBlocks = useAnimatedBlocks({ blocks: editorData });

  useEffect(() => {
    console.log("animatedBlocks", animatedBlocks);
  }, [animatedBlocks]);

  return (
    <div className="w-full p-4 flex flex-col gap-xl h-screen items-center justify-around">
      {!isLoading && !object?.blocks && step === 0 && (
        <FormComponent onSubmit={onSubmit} />
      )}
      {/* {editorData.length ? (
        <IntermediateComponent
          editorData={editorData}
          isLoading={isLoading}
          stop={stop}
          language={language}
          setStep={setStep}
          setEditorData={setEditorData}
        />
      ) : step > 0 ? (
        <Stepper currentStep={step} />
      ) : null} */}
      <>
        {animatedBlocks.map((block) => {
          if (block.type === "header" && block.data.level === 2) {
            return (
              <h2 key={block.id} className="my-8 text-white text-lg">
                {block.data.text}
              </h2>
            );
          }
          if (block.type === "paragraph") {
            return (
              <p key={block.id} className="my-4 text-white text-sm">
                {block.data.text}
              </p>
            );
          }
          return null;
        })}
      </>
      <Link
        href="/impressum"
        className="text-gray-400 hover:text-white cursor-pointer"
      >
        Impressum
      </Link>
    </div>
  );
}
