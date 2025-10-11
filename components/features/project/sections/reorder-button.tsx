"use client";

import { MenuBarItem } from "@/components/core/menubar";
import { SectionItemWithAll } from "@/lib/project/types";
import { reorderSectionItems } from "@/lib/section-item/action";
import { ArrowLeftRight } from "lucide-react";

type Props = {
  sectionItems: SectionItemWithAll[]
};

const ReorderButton = ({ sectionItems }: Props) => {
  const handleClick = () => {
    reorderSectionItems(sectionItems.toReversed())
  };

  return (
    <MenuBarItem onClick={handleClick}>
      <ArrowLeftRight />
    </MenuBarItem>
  );
};

export default ReorderButton;
