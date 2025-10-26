import React, { Fragment } from "react";
import SectionButton from "./section-button";

import { PageWithAll } from "@/lib/project/types";
import SectionListItem from "./section-list-item";

type Props = {
  sections: PageWithAll["sections"];
  projectId: PageWithAll["projectId"];
  pageId: PageWithAll["id"];
};

const SectionList = ({ sections, projectId, pageId }: Props) => {
  
  return (
    <>
      {sections.map((section) => (
        <Fragment key={section.id}>
          <SectionButton projectId={projectId} index={section.index} pageId={section.pageId} />
          <SectionListItem key={section.id} section={section} />
        </Fragment>
      ))}
      <SectionButton index={sections.length} projectId={projectId} pageId={pageId} />
    </>
  );
};

export default SectionList;
