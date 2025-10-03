"use client";

import UseTextEditor from "@/hooks/use-text-editor";
import { Text } from "@/lib/generated/prisma";
import { cn } from "@/lib/utils";
import { EditorContent } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";
import TextEditorTools from "./text-editor-tools";
import useOutsideClick from "@/hooks/use-outside-click";

type Props = {
  text: Text;
};

const TextEditor = ({ text: { content } }: Props) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const [isEditButtonShown, setIsEditButtonShown] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  useOutsideClick([editorRef, toolbarRef], () => {
    setIsEditable(false);
        setIsEditButtonShown(false);
  })

  const editor = UseTextEditor({
    content,
    editable: isEditable,
  });

  const handleClick = () => {
    if (!isEditButtonShown) {
      setIsEditButtonShown(true);
    }

    if (isEditButtonShown && !isEditable) {
      setIsEditable(true);
    }
  };

  if (!editor) return null;

  return (
    <div className="relative">
      {isEditButtonShown && (
        <TextEditorTools
          ref={toolbarRef}
          editor={editor}
          onEditButtonClick={handleClick}
          isEditable={isEditable}
        />
      )}

      <EditorContent
        ref={editorRef}
        className={cn(
          "border p-1",
          isEditButtonShown && "outline outline-offset-4 outline-primary",
          isEditable && "outline-ring/50 outline-dashed border-primary"
        )}
        editor={editor}
        onClick={handleClick}
      />
    </div>
  );
};

export default TextEditor;
