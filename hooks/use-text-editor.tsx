import { useEditor, UseEditorOptions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from '@tiptap/extension-text-align'

type Options = UseEditorOptions;

const useTextEditor = ({ editable, ...rest }: Options) => {
  return useEditor(
    {
      extensions: [StarterKit, TextAlign.configure({
  types: ['heading', 'paragraph'],
})],
      immediatelyRender: false,
      editable,
      editorProps: {
        attributes: {
          class:
            "prose focus:outline-none max-w-full!",
        },
      },
      ...rest,
    },
    [editable]
  );
};

export default useTextEditor;
