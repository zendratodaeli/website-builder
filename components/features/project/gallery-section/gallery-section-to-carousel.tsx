"use client"
import { MenuBarItem } from "@/components/core/menubar";
import { Section, SectionType } from "@/lib/generated/prisma";
import { updateSection } from "@/lib/project/action";
import { GalleryHorizontal } from "lucide-react";
import React from "react";

type Props = {
  id: Section["id"]
}

const GallerySectionToCarousel = ({id}: Props) => {
  return (
    <div>
      <MenuBarItem onClick={() => updateSection({
        id,
        data: {
          type: SectionType.GalleryCarousel
        }
      })}>
        <GalleryHorizontal />
      </MenuBarItem>
    </div>
  );
};

export default GallerySectionToCarousel;
