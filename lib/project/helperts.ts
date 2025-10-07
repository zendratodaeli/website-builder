import { $Enums } from "../generated/prisma";
import { DirectionEnum } from "./types";

export const getNewPosition = (
    position: $Enums.RowPosition,
    direction: DirectionEnum
  ) => {
    if (
      position === $Enums.RowPosition.Left &&
      direction === DirectionEnum.Right
    ) {
      return $Enums.RowPosition.Center;
    }

    if (
      position === $Enums.RowPosition.Center &&
      direction === DirectionEnum.Left
    ) {
      return $Enums.RowPosition.Left;
    }

    if (
      position === $Enums.RowPosition.Center &&
      direction === DirectionEnum.Right
    ) {
      return $Enums.RowPosition.Right;
    }

    if (
      position === $Enums.RowPosition.Right &&
      direction === DirectionEnum.Left
    ) {
      return $Enums.RowPosition.Center;
    }

    return position;
  };