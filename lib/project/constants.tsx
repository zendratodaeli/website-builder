import { ArrowLeft, ArrowRight } from "lucide-react";
import { DirectionEnum } from "./types";

export const POSITION_BUTTONS = [
  {
    icon: <ArrowLeft />,
    direction: DirectionEnum.Left,
    className: "left-0 group-hover:-translate-x-12",
  },
  {
    icon: <ArrowRight />,
    direction: DirectionEnum.Right,
    className: "right-0 group-hover:translate-x-12",
  },
];