"use client"
import { MenuBarItem } from "@/components/core/menubar";
import { Section, SectionType } from "@/lib/generated/prisma";
import { updateSection } from "@/lib/project/action";
import { LayoutGrid } from "lucide-react";
import React from "react";

type Props = {
  id: Section["id"]
}

const GallerySectionToGrid = ({id}: Props) => {
  return (
    <div>
      <MenuBarItem onClick={() => updateSection({
        id,
        data: {
          type: SectionType.GalleryGrid
        }
      })}>
        <LayoutGrid />
      </MenuBarItem>
    </div>
  );
};

export default GallerySectionToGrid;
