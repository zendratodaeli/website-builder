import { Button } from "@/components/ui/button";
import { $Enums } from "@/lib/generated/prisma";
import { POSITION_BUTTONS } from "@/lib/project/constants";
import { DirectionEnum } from "@/lib/project/types";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  rowPosition: $Enums.RowPosition;
  onPositionChange: (direction: DirectionEnum) => void;
}

const TextSectionPosition = ({onPositionChange, rowPosition}: Props) => {
  return POSITION_BUTTONS.filter(button => button.direction !== rowPosition.toLowerCase()).map(({ className, direction, icon }) => (
    <Button
      key={direction}
      size={"icon"}
      className={cn(
        "absolute top-1/2 -translate-y-1/2",
        "invisible group-hover:visible",
        className
      )}
      onClick={(event) => {
        event.stopPropagation();
        onPositionChange(direction)
      }}
    >
      {icon}
    </Button>
  ));
};

export default TextSectionPosition;
