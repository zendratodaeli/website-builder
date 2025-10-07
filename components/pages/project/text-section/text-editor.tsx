"use client";

import UseTextEditor from "@/hooks/use-text-editor";
import { $Enums } from "@/lib/generated/prisma";
import { cn } from "@/lib/utils";
import { EditorContent } from "@tiptap/react";
import TextEditorTools from "./text-editor-tools";
import { TextWithExternalLink } from "@/lib/project/types";
import { Button } from "@/components/ui/button";
import UpdateExternalLinkPopover from "../external-link/update-external-link-popover";
import TextSectionPosition from "./text-section-position";

type Props = {
  text: TextWithExternalLink;
};

const TextEditor = ({
  text: { id, content, externalLink, rowPosition: position },
}: Props) => {
  const {
    editor,
    rowPosition,
    editorRef,
    isEditable,
    isEditButtonShown,
    toolbarRef,
    reset,
    handleEditMode,
    handlePositionChange,
  } = UseTextEditor({
    content,
    id,
    position,
  });

  if (!editor) return null;

  return (
    <div
      className={cn(
        "flex",
        rowPosition === $Enums.RowPosition.Center && "justify-center",
        rowPosition === $Enums.RowPosition.Right && "justify-end"
      )}
    >
      <div
        ref={editorRef}
        className={cn(
          "p-1 max-w-[800px] relative",
          "border border-transparent hover:border-border",
          "flex flex-col gap-8 items-start",
          rowPosition === $Enums.RowPosition.Center && "items-center",
          rowPosition === $Enums.RowPosition.Right && "items-end",
          isEditButtonShown && "outline outline-offset-4 outline-primary",
          isEditable && "outline-ring/50 outline-dashed border-primary"
        )}
        onClick={handleEditMode}
      >
        <EditorContent editor={editor} />

        {externalLink && (
          <UpdateExternalLinkPopover externalLink={externalLink}>
            <Button onClick={reset}>{externalLink?.label}</Button>
          </UpdateExternalLinkPopover>
        )}

        {isEditButtonShown && (
          <TextEditorTools
            ref={toolbarRef}
            editor={editor}
            onEditButtonClick={handleEditMode}
            isEditable={isEditable}
          />
        )}
        <TextSectionPosition
          onPositionChange={(direction) => {
            handlePositionChange(rowPosition, direction);
          }}
        />
      </div>
    </div>
  );
};

export default TextEditor;
