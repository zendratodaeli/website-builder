import React from "react";
import SectionButton from "./section-button";
import { $Enums, Project, Section, Text } from "@/lib/generated/prisma";
import TextEditor from "./text-section/text-editor";

import SectionContainer from "./section-container";
import { ProjectWithAll } from "@/lib/project/types";

type Props = {
  sections: ProjectWithAll["sections"];
  projectId: Project["id"];
};

const SectionList = ({ sections, projectId }: Props) => {
  return (
    <ul>
      {sections.map(({ id, index, text, type, projectId }) => (
        <li key={id}>
          <SectionButton projectId={projectId} index={index} />
          <SectionContainer text={text} id={id}>
            {type === $Enums.SectionType.Text && text && (
              <TextEditor text={text} />
            )}
          </SectionContainer>
        </li>
      ))}
      <li>
        <SectionButton index={sections.length} projectId={projectId} />
      </li>
    </ul>
  );
};

export default SectionList;
