import { $Enums } from "@/lib/generated/prisma";
import { getNewPosition } from "@/lib/project/helperts";
import { DirectionEnum } from "@/lib/project/types";
import { useRef, useState } from "react";

type Options = {
  position: $Enums.RowPosition;
};
export default function useTextEditorStates({ position }: Options) {
  const editorRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const [isEditButtonShown, setIsEditButtonShown] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const [rowPosition, setRowPosition] = useState<$Enums.RowPosition>(position);

  const handlePositionChange = (
    position: $Enums.RowPosition,
    direction: DirectionEnum
  ) => {
    const newPosition = getNewPosition(position, direction);
    setRowPosition(newPosition);
  };

  const handleEditMode = () => {
    if (!isEditButtonShown) {
      setIsEditButtonShown(true);
    }

    if (isEditButtonShown && !isEditable) {
      setIsEditable(true);
    }
  };

  const reset = () => {
    setIsEditable(false);
    setIsEditButtonShown(false);
  };

  return {
    editorRef,
    toolbarRef,
    isEditButtonShown,
    isEditable,
    rowPosition,
    reset,
    handleEditMode,
    handlePositionChange,
  };
}
