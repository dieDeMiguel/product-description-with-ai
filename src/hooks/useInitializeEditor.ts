"use client";

import { loadEditorTools } from "@/utils/editor/loadEditorTools";
import EditorJS, {
  OutputBlockData,
  ToolConstructable,
} from "@editorjs/editorjs";
import { MutableRefObject, useEffect } from "react";

const useInitializeEditor = (
  ref: MutableRefObject<EditorJS | null>,
  inlineToolbar: boolean,
  sectionID: string,
  data: OutputBlockData[],
  isReadOnly: boolean
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
            readOnly: isReadOnly,
            autofocus: !isReadOnly,
            data: {
              time: new Date().getTime(),
              blocks:
                data.length > 0
                  ? data
                  : [
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
          ref.current = null;
          console.log("EditorJS destroyed successfully");
        } catch (error) {
          console.error("Error destroying EditorJS:", error);
        }
      }
    };
  }, [ref, sectionID, data]);
};

export default useInitializeEditor;
