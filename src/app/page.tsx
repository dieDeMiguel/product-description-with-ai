"use client";

import ProductDescriptionForm from "@/components/product-description-form/product-description-form";
import EditorPlaceholder from "@/components/ui/editor-placeholder";
import GenieLamp from "@/public/genie-lamp.svg";
import { ProductDescriptionSchema } from "@/schemas/form-schema";
import EditorBlocksSchema from "@/schemas/product-description-schema";
import { OutputBlockData } from "@editorjs/editorjs";
import { experimental_useObject as useObject } from "ai/react";
import { debounce } from "lodash";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect } from "react";
import { z } from "zod";

type ProductDescriptionFormData = z.infer<typeof ProductDescriptionSchema>;

export default function ProductDescriptionGenerator() {
  const { object, submit, isLoading } = useObject({
    api: "/api/generate-product-description",
    schema: EditorBlocksSchema,
  });

  const Editor = dynamic(() => import("@/components/editor/editor"), {
    ssr: false,
    loading: () => <EditorPlaceholder />,
  });

  const onSubmit = async (data: ProductDescriptionFormData) => {
    await submit(data);
  };

  // if (isLoading) return Stepper({ currentStep: 1 });

  useEffect(() => {
    const debouncedUpdate = debounce((obj) => {
      // Handle the debounced object update here
      console.log(obj);
    }, 1000);

    if (object) {
      debouncedUpdate(object);
    }

    // Cleanup function to cancel any pending debounced calls
    return () => {
      debouncedUpdate.cancel();
    };
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
        {object?.blocks?.length ? (
          <div className="max-w-maxWidthEditorCanvas w-full lg:w-3/4 shadow-md h-full overflow-auto bg-white px-4 py-8 lg:px-6 rounded-lg flex flex-col gap-2">
            <Editor
              sectionID="description"
              productDescription={object.blocks as OutputBlockData[]}
              wrapperClassName=""
              className="editor-content"
              isReadOnly={false}
            />
            <div className="max-w-maxWidthEditorCanvas m-auto">
              <p className="text-xs text-gray-500">
                The generated content can contain errors, see
                &apos;Impresum&apos; page for more Information
              </p>
              <p className="text-xs text-gray-500">
                Der generierte Inhalt kann Fehler enthalten, siehe
                &apos;Impressum&apos;-Seite für weitere Informationen.
              </p>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <Link
                href="/"
                className="block text-center text-gray-500 hover:text-black cursor-pointer"
              >
                Home
              </Link>
              <Link
                href="/impressum"
                className="block text-center text-gray-500 hover:text-black cursor-pointer"
              >
                Impressum
              </Link>
            </div>
          </div>
        ) : (
          <ProductDescriptionForm
            onSubmit={onSubmit}
            isSubmitting={isLoading}
          />
        )}
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
