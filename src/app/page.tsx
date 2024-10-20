// src/app/product-description-generator/page.tsx
"use client";

import ProductDescriptionEditor from "@/components/editor/product-description-editor/product-description-editor";
import ProductDescriptionForm from "@/components/product-description-form/product-description-form";
import GenieLamp from "@/public/genie-lamp.svg";
import { ProductDescriptionSchema } from "@/schemas/form-schema";
import EditorBlocksSchema from "@/schemas/product-description-schema";
import BlockRenderer from "@/utils/editor/block-renderer";
import { OutputBlockData } from "@editorjs/editorjs";
import { experimental_useObject as useObject } from "ai/react";
import { useMemo } from "react";
import { z } from "zod";

type ProductDescriptionFormData = z.infer<typeof ProductDescriptionSchema>;

export default function ProductDescriptionGenerator() {
  const { object, submit, isLoading } = useObject({
    api: "/api/generate-product-description",
    schema: EditorBlocksSchema,
  });

  const onSubmit = async (data: ProductDescriptionFormData) => {
    await submit(data);
  };

  const renderedBlocks = useMemo(() => {
    if (object?.blocks) {
      return <BlockRenderer blocks={object.blocks as OutputBlockData[]} />;
    }
    return null;
  }, [object]);

  return (
    <div className="w-full max-w-maxWidthEditorCanvas sm:w-2/3 lg:1/2 p-4 flex flex-col gap-xl h-screen items-center justify-around">
      <div className="w-full">
        <div className="flex items-center h-20">
          <h1 className="text-2xl font-bold">Product Description Genie</h1>
          <GenieLamp
            style={{ width: 50, height: 50, marginBottom: 10 }}
            alt="genie lamp"
          />
        </div>
        {object?.blocks?.length && !isLoading ? (
          <>
            <ProductDescriptionEditor productDescription={object.blocks} />
            {renderedBlocks}
          </>
        ) : (
          <ProductDescriptionForm
            onSubmit={onSubmit}
            isSubmitting={isLoading}
          />
        )}
      </div>
    </div>
  );
}
