"use client";

import EditorComponent from "@/components/editor/editor-component/editor-component";
import FormComponent from "@/components/form/form";
import { Button } from "@/components/ui/button";
import { ProductDescriptionSchema } from "@/schemas/form-schema";
import EditorBlocksSchema from "@/schemas/product-description-schema";
import RenderedBlocks from "@/utils/editor/block-renderer";
import { OutputBlockData } from "@editorjs/editorjs";
import { experimental_useObject as useObject } from "ai/react";
import { useState } from "react";
import { z } from "zod";

type FormData = z.infer<typeof ProductDescriptionSchema>;

export default function ProductDescriptionGenerator() {
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const { object, submit, isLoading, stop } = useObject({
    api: "/api/generate-product-description",
    schema: EditorBlocksSchema,
    onFinish: () => setShowEditor(true),
  });

  const onSubmit = async (data: FormData) => {
    await submit(data);
  };

  return (
    <div className="w-full max-w-maxWidthEditorCanvas sm:w-2/3 lg:1/2 p-4 flex flex-col gap-xl h-screen items-center justify-around">
      {!isLoading && !showEditor && (
        <FormComponent onSubmit={onSubmit} isSubmitting={isLoading} />
      )}
      {isLoading && object?.blocks && (
        <div className="streaming-blocks">
          <h2>Generating product description...</h2>
          <RenderedBlocks blocks={object.blocks as OutputBlockData[]} />
          <Button onClick={() => stop()}>Stop Stream</Button>
        </div>
      )}
      {showEditor && object?.blocks && (
        <EditorComponent editorData={object.blocks as OutputBlockData[]} />
      )}
    </div>
  );
}
