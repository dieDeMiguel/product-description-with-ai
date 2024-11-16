"use client";

import FormComponent from "@/components/form/form";
import { ProductDescriptionSchema } from "@/schemas/form-schema";
import EditorBlocksSchema from "@/schemas/product-description-schema";
import { OutputBlockData } from "@editorjs/editorjs";
import { experimental_useObject as useObject } from "ai/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { z } from "zod";

type FormData = z.infer<typeof ProductDescriptionSchema>;

export default function Page() {
  const [step, setStep] = useState<number>(0);
  const [language, setLanguage] = useState<string>("");
  const [editorData, setEditorData] = useState<OutputBlockData[]>([]);
  const [visibleBlocks, setVisibleBlocks] = useState<OutputBlockData[]>([
    { type: "paragraph", data: { text: "" } },
  ]);
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

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleBlocks((prev) => {
        if (prev.length < editorData.length) {
          return [...prev, editorData[prev.length]];
        }
        clearInterval(timer);
        return prev;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [editorData]);

  useEffect(() => {
    console.log("visibleBlocks: ", visibleBlocks);
  }, [visibleBlocks]);

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
      <div className="max-w-2xl mx-auto p-4">
        <AnimatePresence>
          {visibleBlocks.map((block) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {block.type === "header" && (
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {block.data.text}
                </motion.h2>
              )}
              {block.type === "paragraph" && (
                <TypingEffect text={block.data.text} />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
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

function TypingEffect({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => {
        if (i < text.length) {
          i++;
          return text.slice(0, i);
        }
        clearInterval(timer);
        return prev;
      });
    }, 20); // Adjust this value to control typing speed

    return () => clearInterval(timer);
  }, [text]);

  return <p className="text-white leading-relaxed">{displayedText}</p>;
}
