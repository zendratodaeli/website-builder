import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { useCallback, useEffect } from "react";
import { $Enums, Text } from "@/lib/generated/prisma";
import useOutsideClick from "./use-outside-click";
import { toast } from "sonner";
import { updateText } from "@/lib/text/action";
import { debounce } from "@/lib/utils";
import useTextEditorStates from "./use-text-editor-states";

type Options = {
  id: Text["id"];
  content: Text["content"];
  position: $Enums.RowPosition;
};

const useTextEditor = ({ position, id, content }: Options) => {
  const { reset, isEditable, toolbarRef, editorRef, rowPosition, ...rest } =
    useTextEditorStates({ position });

  useOutsideClick([editorRef, toolbarRef], () => {
    reset();
  });

  const update = async (
    id: Text["id"],
    content: Text["content"],
    rowPosition: Text["rowPosition"]
  ) => {
    const { data, error, message } = await updateText({
      id,
      data: { content, rowPosition },
    });

    if (data) return toast.success(message);
    if (error) return toast.error(error.message);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceAndUpdate = useCallback(debounce(update, 500), []);

  const editor = useEditor(
    {
      content,
      editable: isEditable,
      immediatelyRender: false,
      editorProps: {
        attributes: {
          class: "prose focus:outline-none max-w-full!",
        },
      },
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
      ],
      onUpdate: async ({ editor }) => {
        const updatedContent = editor.getHTML();

        debounceAndUpdate(id, updatedContent, rowPosition);
      },
    },
    [isEditable]
  );

  useEffect(() => {
    if (editor && rowPosition !== position) {
      editor
        .chain()
        .focus("all")
        .setTextAlign(rowPosition.toLowerCase())
        .blur()
        .run();
    }
  }, [editor, position, rowPosition]);

  return {
    editor,
    editorRef,
    toolbarRef,
    reset,
    isEditable,
    debounceAndUpdate,
    rowPosition,
    ...rest,
  };
};

export default useTextEditor;
