"use client";

import EditorComponent from "@/components/editor/editor-component/editor-component";
import FormComponent from "@/components/form/form";
import { ProductDescriptionSchema } from "@/schemas/form-schema";
import EditorBlocksSchema from "@/schemas/product-description-schema";
import { OutputBlockData } from "@editorjs/editorjs";
import { experimental_useObject as useObject } from "ai/react";
import { z } from "zod";

type FormData = z.infer<typeof ProductDescriptionSchema>;

export default function ProductDescriptionGenerator() {
  const { object, submit, isLoading, stop } = useObject({
    api: "/api/generate-product-description",
    schema: EditorBlocksSchema,
  });

  const onSubmit = async (data: FormData) => {
    await submit(data);
  };

  return (
    <div className="w-full sm:w-2/3 lg:1/2 p-4 flex flex-col gap-xl h-screen items-center justify-around">
      {!isLoading && !object?.blocks && (
        <FormComponent onSubmit={onSubmit} isSubmitting={isLoading} />
      )}
      {object?.blocks && (
        <EditorComponent
          editorData={object.blocks as OutputBlockData[]}
          isLoading={isLoading}
          stop={stop}
        />
      )}
    </div>
  );
}
