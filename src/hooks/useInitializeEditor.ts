import { loadEditorTools } from "@/utils/editor/loadEditorTools";
import EditorJS, { OutputData, ToolConstructable } from "@editorjs/editorjs";
import { MutableRefObject, useEffect } from "react";

const useInitializeEditor = (
  ref: MutableRefObject<EditorJS | null>,
  content: OutputData | null,
  inlineToolbar: boolean,
  sectionID: string
) => {
  useEffect(() => {
    const initializeEditor = async () => {
      const { default: EditorJS } = await import("@editorjs/editorjs");

      if (!ref.current) {
        const tools = await loadEditorTools();

        const editor = new EditorJS({
          minHeight: 0,
          holder: `${sectionID}`,
          tools: tools as unknown as { [toolName: string]: ToolConstructable },
          inlineToolbar: inlineToolbar,
          hideToolbar: true,
          data: content
            ? content
            : {
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
  }, [ref, inlineToolbar, content]);
};

export default useInitializeEditor;
