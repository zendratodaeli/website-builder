import React from "react";
import SectionContainer from "./section-container";
import TextEditor from "../text-section/text-editor";
import { $Enums } from "@/lib/generated/prisma";
import { SectionWithAll } from "@/lib/project/types";
import ImageSection from "../image-section/image-section";
import TextImageSection from "../text-image-section/text-image-section";

type Props = {
  section: SectionWithAll
}

const SectionListItem = ({section}: Props) => {

  const {id, type, text, image, isReversed} = section;
  
  const isTextSection = type === $Enums.SectionType.Text && text
  const isImageSection = type === $Enums.SectionType.Image && image
  const isTextImageSection = type === $Enums.SectionType.TextImage && text && image

  return (
 
      <SectionContainer section={section}>
        { isTextSection && <TextEditor text={text} />}
        { isImageSection && ( 
          <ImageSection image={image} />
        )}
        { isTextImageSection && ( 
          <TextImageSection image={image} text={text} isReversed={isReversed} sectionId={id} />
        )}
      </SectionContainer>
  );
};

export default SectionListItem;
