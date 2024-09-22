"use client";

import { loadEditorTools } from "@/utils/editor/loadEditorTools";
import EditorJS, { ToolConstructable } from "@editorjs/editorjs";
import { MutableRefObject, useEffect } from "react";

const useInitializeEditor = (
  ref: MutableRefObject<EditorJS | null>,
  inlineToolbar: boolean,
  sectionID: string
) => {
  useEffect(() => {
    const initializeEditor = async () => {
      if (!ref.current) {
        const tools = await loadEditorTools();
        try {
          const editor = new EditorJS({
            holder: `${sectionID}`,
            tools: tools as unknown as {
              [toolName: string]: ToolConstructable;
            },
            inlineToolbar: inlineToolbar,
            hideToolbar: true,
            data: {
              time: new Date().getTime(),
              blocks: [
                {
                  type: "paragraph",
                  data: {
                    text: "",
                  },
                },
              ],
            },
            i18n: {
              messages: {},
            },
          });
          ref.current = editor;
          console.log("EditorJS initialized successfully");
        } catch (error) {
          console.error("Error initializing EditorJS:", error);
        }
      }
    };

    initializeEditor();

    return () => {
      const editorInstance = ref.current;
      if (editorInstance && typeof editorInstance.destroy === "function") {
        try {
          editorInstance.destroy();
        } catch (error) {
          console.error("Error destroying EditorJS:", error);
        }
      }
    };
  }, [ref, sectionID]);
};

export default useInitializeEditor;
