"use client";

import { SectionItemWithAll } from "@/lib/project/types";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ImageSection from "../image-section/image-section";
import { deleteSectionItem } from "@/lib/section-item/action";

type Props = {
  sectionItems: SectionItemWithAll[];
};

const GalleryCarouselSeciton = ({ sectionItems }: Props) => {
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
    >
      <CarouselContent>
        {sectionItems.map(({ id, image }) => (
          <CarouselItem key={id} className="md:basis-1/2 lg:basis-1/4">
            {image && (
              <ImageSection
                image={image}
                onDelete={() => deleteSectionItem(id)}
              />
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4 z-50" />
    </Carousel>
  );
};

export default GalleryCarouselSeciton;
