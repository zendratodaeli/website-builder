import React from "react";
import SectionContainer from "../section-container/section-container";
import TextEditor from "../text-section/text-editor";
import { SectionType } from "@/lib/generated/prisma";
import { SectionWithAll } from "@/lib/project/types";
import ImageSection from "../image-section/image-section";
import VideoSection from "../video-section/video-section";
import SectionItemReorder from "./section-item-reorder";

type Props = {
  section: SectionWithAll;
};

const SectionListItem = ({ section }: Props) => {
  const {type, items } = section;

  const text = items[0].text;
  const isTextSection = type === SectionType.Text && text;
  const image = items[0].image;
  const isImageSection = type === SectionType.Image && image;
  const video = items[0].video;
  const isVideoSection = type === SectionType.Video && video;
  const isReorderable = type === SectionType.TextImage || type === SectionType.TextVideo;
  
  return (
    <SectionContainer section={section}>
      {isTextSection && <TextEditor text={text} />}
      {isImageSection && <ImageSection image={image} />}
      {isVideoSection && <VideoSection video={video} />}
      {isReorderable && (
        <SectionItemReorder
          sectionItems={items}
        />
      )}
    </SectionContainer>
  );
};

export default SectionListItem;
