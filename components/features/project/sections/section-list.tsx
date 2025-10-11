import React, { Fragment } from "react";
import SectionButton from "./section-button";
import { Project } from "@/lib/generated/prisma";

import { ProjectWithAll } from "@/lib/project/types";
import SectionListItem from "./section-list-item";

type Props = {
  sections: ProjectWithAll["sections"];
  projectId: Project["id"];
};

const SectionList = ({ sections, projectId }: Props) => {
  
  return (
    <>
      {sections.map((section) => (
        <Fragment key={section.id}>
          <SectionButton projectId={projectId} index={section.index} />
          <SectionListItem key={section.id} section={section} />
        </Fragment>
      ))}
      <SectionButton index={sections.length} projectId={projectId} />
    </>
  );
};

export default SectionList;
