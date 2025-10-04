"use client";

import UseTextEditor from "@/hooks/use-text-editor";
import { Text } from "@/lib/generated/prisma";
import { cn, debounce } from "@/lib/utils";
import { EditorContent } from "@tiptap/react";
import { useCallback, useRef, useState } from "react";
import TextEditorTools from "./text-editor-tools";
import useOutsideClick from "@/hooks/use-outside-click";
import { updateText } from "@/lib/text/action";
import { toast } from "sonner";
import { TextWithExternalLink } from "@/lib/project/types";
import { Button } from "@/components/ui/button";
import UpdateExternalLinkPopover from "./update-external-link-popover";

type Props = {
  text: TextWithExternalLink;
};

const TextEditor = ({ text: { id, content, externalLink } }: Props) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const [isEditButtonShown, setIsEditButtonShown] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const reset = () => {
    setIsEditable(false);
    setIsEditButtonShown(false);
  };

  useOutsideClick([editorRef, toolbarRef], () => {
    reset();
  });

  const debounceAndUpdate = useCallback(
    debounce(async (id: Text["id"], content: Text["content"]) => {
      const { data, error, message } = await updateText({
        id,
        data: { content },
      });

      if (data) return toast.success(message);
      if (error) return toast.error(error.message);
    }),
    []
  );

  const editor = UseTextEditor({
    content,
    editable: isEditable,
    onUpdate: async ({ editor }) => {
      const updatedContent = editor.getHTML();

      debounceAndUpdate(id, updatedContent);
    },
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

      <div
        ref={editorRef}
        className={cn(
          "border border-transparent hover:border-border p-1 flex flex-col gap-8 items-start max-w-[800px]",
          isEditButtonShown && "outline outline-offset-4 outline-primary",
          isEditable && "outline-ring/50 outline-dashed border-primary"
        )}
        onClick={handleClick}
      >
        <EditorContent editor={editor} />
        {externalLink && (
          <UpdateExternalLinkPopover externalLink={externalLink}>
            <Button onClick={reset}>{externalLink?.label}</Button>
          </UpdateExternalLinkPopover>
        )}
      </div>
    </div>
  );
};

export default TextEditor;