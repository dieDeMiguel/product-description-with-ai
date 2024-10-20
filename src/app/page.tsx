"use client";

import EditorComponent from "@/components/editor/editor-component/editor-component";
import FormComponent from "@/components/form/form";
import { Button } from "@/components/ui/button";
import { ProductDescriptionSchema } from "@/schemas/form-schema";
import EditorBlocksSchema from "@/schemas/product-description-schema";
import BlockRenderer from "@/utils/editor/block-renderer";
import { OutputBlockData } from "@editorjs/editorjs";
import { experimental_useObject as useObject } from "ai/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { z } from "zod";

type ProductDescriptionFormData = z.infer<typeof ProductDescriptionSchema>;

export default function ProductDescriptionGenerator() {
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const { object, submit, isLoading, stop } = useObject({
    api: "/api/generate-product-description",
    schema: EditorBlocksSchema,
    onFinish: () => setShowEditor(true),
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
      <EditorComponent productDescription={object} />
      {renderedBlocks}
      <FormComponent onSubmit={onSubmit} isSubmitting={isLoading} />
      <Button onClick={() => stop()}>Stop Stream</Button>
      <Link
        href="/impressum"
        className="text-gray-400 hover:text-white cursor-pointer"
      >
        Impressum
      </Link>
    </div>
  );
}
