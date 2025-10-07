import React from "react";
import SectionButton from "./section-button";
import SectionContainer from "./section-container";
import TextEditor from "../text-section/text-editor";
import { $Enums } from "@/lib/generated/prisma";
import { SectionWithAll } from "@/lib/project/types";

type Props = {
  section: SectionWithAll
}

const SectionListItem = ({section: {id, projectId, index, type, text}}: Props) => {
  return (
    <>
      <SectionButton projectId={projectId} index={index} />
      <SectionContainer text={text} id={id}>
        {type === $Enums.SectionType.Text && text && <TextEditor text={text} />}
      </SectionContainer>
    </>
  );
};

export default SectionListItem;
