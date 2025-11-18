import { RowPosition } from "@/lib/generated/prisma";
import { getNewPosition } from "@/lib/project/helpers";
import { DirectionEnum } from "@/lib/project/types";
import { useState } from "react";

type Props = {
  position: RowPosition;
}

const useRowPosition = ({position}: Props) => {
  const [rowPosition, setRowPosition] = useState<RowPosition>(position);
  
    const changePosition = (direction: DirectionEnum) => {
      const newPosition = getNewPosition(rowPosition, direction);
      setRowPosition(newPosition);
    };
  return {rowPosition, changePosition}
}

export default useRowPosition
