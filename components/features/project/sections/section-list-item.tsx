import React from "react";
import SectionContainer from "../section-container/section-container";
import TextSection from "../text-section/text-section";
import { SectionType } from "@/lib/generated/prisma";
import { SectionWithAll } from "@/lib/project/types";
import ImageSection from "../image-section/image-section";
import VideoSection from "../video-section/video-section";
import SectionItemReorder from "./section-item-reorder";
import GalleryGridSection from "../gallery-section/gallery-grid-section";
import GalleryCarouselSeciton from "../gallery-section/gallery-carousel-section";
import { cn } from "@/lib/utils";

type Props = {
  section: SectionWithAll;
};

const SectionListItem = ({ section }: Props) => {
  const {type, items } = section;

  const text = items[0]?.text;
  const isTextSection = type === SectionType.Text && text;
  const image = items[0]?.image;
  const isImageSection = type === SectionType.Image && image;
  const video = items[0]?.video;
  const isVideoSection = type === SectionType.Video && video;
  const isGalleryGridSection = type === SectionType.GalleryGrid;
  const isGalleryCarouselSection = type === SectionType.GalleryCarousel;
  const isReorderable = type === SectionType.TextImage || type === SectionType.TextVideo;
  
  return (
    <SectionContainer className={cn(isGalleryCarouselSection && "max-w-none px-0")} section={section}>
      {isTextSection && <TextSection text={text} />}
      {isImageSection && <ImageSection image={image} />}
      {isVideoSection && <VideoSection video={video} />}
      {isReorderable && (
        <SectionItemReorder
          sectionItems={items}
        />
      )}
      {isGalleryGridSection && <GalleryGridSection sectionItems={items} />}
      {isGalleryCarouselSection && <GalleryCarouselSeciton sectionItems={items}/>}

    </SectionContainer>
  );
};

export default SectionListItem;
