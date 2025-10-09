"use client";

import { MenuBarItem } from "@/components/core/menubar";
import { Section } from "@/lib/generated/prisma";
import { updateSection } from "@/lib/project/action";
import { ArrowLeftRight } from "lucide-react";

type Props = {
  id: Section["id"];
  // id: number;
  isReversed: boolean;
};

const TextImageSwapButton = ({ id, isReversed }: Props) => {
  const handleClick = () => {
    updateSection({ id, data: { isReversed: !isReversed } });
  };

  return (
    <MenuBarItem onClick={handleClick}>
      <ArrowLeftRight />
    </MenuBarItem>
  );
};

export default TextImageSwapButton;
