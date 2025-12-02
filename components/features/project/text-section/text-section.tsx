"use client";

import { RowPosition, Text } from "@/lib/generated/prisma";
import { cn } from "@/lib/utils";
import { EditorContent } from "@tiptap/react";
import TextSectionMenu from "./text-section-menu";
import { TextWithExternalLink } from "@/lib/project/types";
import { Button } from "@/components/ui/button";
import UpdateExternalLinkPopover from "../external-link/update-external-link-popover";
import TextSectionPosition from "./text-section-position";
import { useCallback, useEffect } from "react";
import { updateText } from "@/lib/text/action";
import useSectionWrapper from "@/hooks/use-section-wrapper";
import SectionWrapper from "../section-wrapper/section-wrapper";
import useTextEditor from "@/hooks/use-text-editor";
import useRowPosition from "@/hooks/use-row-position";
import useActionToast from "@/hooks/use-action-toast";

type Props = {
  text: TextWithExternalLink;
};

const TextSection = ({
  text: { id, content, externalLink, rowPosition: position },
}: Props) => {
  const {
    menuRef,
    wrapperRef,
    portalRef,
    isMenuShown,
    isEditable,
    reset,
    activateEditMode,
  } = useSectionWrapper();

  const { editor, debouncedContent } = useTextEditor({
    isEditable: isEditable,
    content,
  });
  const { rowPosition, changePosition } = useRowPosition({ position });
  const toast = useActionToast();

  const update = useCallback(
    async (
      id: Text["id"],
      content: Text["content"],
      rowPosition: Text["rowPosition"]
    ) => {
      const state = await updateText({ id, data: { content, rowPosition } });
      toast(state);
    },
    [toast]
  );

  const alignText = useCallback(
    (textAlign: string) => {
      editor?.chain().focus("all").setTextAlign(textAlign).blur().run();
    },
    [editor]
  );

  useEffect(() => {
    if (debouncedContent !== content) {
      update(id, debouncedContent, rowPosition);
    }
  }, [content, debouncedContent, id, rowPosition, update]);

  useEffect(() => {
    if (rowPosition !== position) {
      alignText(rowPosition.toLowerCase());
    }
  }, [alignText, position, rowPosition]);

  if (!editor) return null;

  const positionStyle = {
    [RowPosition.Left]: "",
    [RowPosition.Center]: "items-center justify-self-center",
    [RowPosition.Right]: "items-end justify-self-end",
  };

  return (
    <SectionWrapper
      wrapperRef={wrapperRef}
      isMenuShown={isMenuShown}
      onClick={activateEditMode}
      className={cn(
        "p-1 max-w-[800px]",
        "border border-transparent",
        "flex flex-col gap-8 items-start",
        positionStyle[rowPosition],
        isEditable && "outline-ring/50 outline-dashed border-primary"
      )}
    >
      <EditorContent editor={editor} />

      {externalLink && (
        <UpdateExternalLinkPopover externalLink={externalLink}>
          <Button onClick={reset}>{externalLink?.label}</Button>
        </UpdateExternalLinkPopover>
      )}

      {isMenuShown && (
        <TextSectionMenu
          menuRef={menuRef}
          portalRef={portalRef}
          editor={editor}
          isEditable={isEditable}
          onEditButtonClick={activateEditMode}
        />
      )}
      <TextSectionPosition
        rowPosition={rowPosition}
        onPositionChange={changePosition}
      />
    </SectionWrapper>
  );
};

export default TextSection;
