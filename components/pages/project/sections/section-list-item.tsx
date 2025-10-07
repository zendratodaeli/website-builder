import React from "react";
import SectionButton from "./section-button";
import SectionContainer from "./section-container";
import TextEditor from "../text-section/text-editor";
import { $Enums } from "@/lib/generated/prisma";
import { SectionWithAll } from "@/lib/project/types";
import ImageSection from "../image-section/image-section";

type Props = {
  section: SectionWithAll
}

const SectionListItem = ({section: {id, projectId, index, type, text, image}}: Props) => {
  
  return (
    <>
      <SectionButton projectId={projectId} index={index} />
      <SectionContainer text={text} id={id}>
        {type === $Enums.SectionType.Text && text && <TextEditor text={text} />}
        {type === $Enums.SectionType.Image && image && ( 
          <ImageSection image={image} />
        )}
      </SectionContainer>
    </>
  );
};

export default SectionListItem;
