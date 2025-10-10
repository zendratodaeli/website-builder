"use client";

import MenuBar, { MenuBarItem } from "@/components/core/menubar";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  padding: number;
  position: "top" | "bottom";
  onIncrement: () => void;
  onDecrement: () => void;
};

const SectionContainerPadding = ({
  padding,
  position,
  onIncrement,
  onDecrement,
}: Props) => {
  return (
    <div
      className={cn(
        "group/padding",
        "min-h-4 w-full",
        "absolute left-0",
        position === "top" ? "top-0" : "bottom-0"
      )}
    >
      <MenuBar
        className={cn(
          "peer/padding",
          "absolute -left-40",
          "group-hover/padding:translate-x-44 duration-300",
          position === "top" ? "top-4" : "bottom-4"
        )}
      >
        <MenuBarItem onClick={onIncrement} disabled={padding >= 100}>
          <ArrowUp />
        </MenuBarItem>
        <MenuBarItem onClick={onDecrement} disabled={padding <= 0}>
          <ArrowDown />
        </MenuBarItem>
        <Button className="text-white">{padding}px</Button>
      </MenuBar>
      <div
        style={{ height: padding }}
        className="peer-hover/padding:bg-blue-100"
      ></div>
    </div>
  );
};

export default SectionContainerPadding;
