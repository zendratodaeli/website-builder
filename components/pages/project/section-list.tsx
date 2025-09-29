import React from "react";
import SectionButton from "./section-button";
import Container from "@/components/core/container";
import { $Enums, Project, Section, Text } from "@/lib/generated/prisma";
import TextEditor from "./text-section/text-editor";

type Props = {
  sections: (Section & { text: Text | null })[];
  projectId: Project["id"]
};

const SectionList = ({ sections, projectId }: Props) => {
  return (
    <ul>
      {sections.map(({id, index, text, type, projectId}) => (
        <li key={id}>
          <SectionButton projectId={projectId} index={index}/>
          <Container asChild>
            <section className="py-16">
              {type === $Enums.SectionType.Text && text && (
                <TextEditor text={text}/>
              )}
            </section>

          </Container>
        </li>
      ))}
      <li>
        <SectionButton index={sections.length} projectId={projectId} />
      </li>
    </ul>
  );
};

export default SectionList;
