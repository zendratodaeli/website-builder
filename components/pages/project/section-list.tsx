import React from "react";
import SectionButton from "./section-button";
import Container from "@/components/core/container";
import { $Enums, Section, Text } from "@/lib/generated/prisma";
import TextEditor from "./text-section/text-editor";

type Props = {
  sections: (Section & { text: Text | null })[];
};

const SectionList = ({ sections }: Props) => {
  return (
    <ul>
      {sections.map((section) => (
        <li key={section.id}>
          <SectionButton />
          <Container asChild>
            <section className="py-16">
              {section.type === $Enums.SectionType.Text && section.text && (
                <TextEditor text={section.text}/>
              )}
            </section>

          </Container>
        </li>
      ))}
      <li>
        <SectionButton />
      </li>
    </ul>
  );
};

export default SectionList;
