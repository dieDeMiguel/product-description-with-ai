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

        const editor = new EditorJS({
          holder: `${sectionID}`,
          tools: tools as unknown as { [toolName: string]: ToolConstructable },
          inlineToolbar: inlineToolbar,
          hideToolbar: true,
          data: {
            time: new Date().getTime(),
            blocks: [],
          },
          i18n: {
            messages: {},
          },
        });
        ref.current = editor;
      }
    };

    initializeEditor();

    return () => {
      const editorInstance = ref.current;
      if (editorInstance && typeof editorInstance.destroy === "function") {
        editorInstance.destroy();
      }
    };
  }, [ref, inlineToolbar, sectionID]);
};

export default useInitializeEditor;
