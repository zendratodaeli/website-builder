import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { useState } from "react";
import { Color, TextStyle } from "@tiptap/extension-text-style";
import useDebounce from "@/hooks/use-debounce";

type Options = {
  isEditable: boolean;
  content: string;
};

const useTextEditor = ({ isEditable, content: contentFromDB }: Options) => {
  const [content, setContent] = useState<string>(contentFromDB);

  const debouncedContent = useDebounce(content, 2000);

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
        TextStyle,
        Color,
      ],
      onUpdate: async ({ editor }) => {
        const updatedContent = editor.getHTML();

        setContent(updatedContent);

      },
    },
    [isEditable]
  );

  return {editor, debouncedContent};
};

export default useTextEditor;
