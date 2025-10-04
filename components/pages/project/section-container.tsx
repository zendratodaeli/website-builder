import React, { ReactNode } from "react";
import Container from "@/components/core/container";
import SectionMenu from "./section-menu";
import { Section } from "@/lib/generated/prisma";
import { TextWithExternalLink } from "@/lib/project/types";

type Props = {
  children: ReactNode;
  id: Section["id"];
  text: TextWithExternalLink | null;
};

const SectionContainer = ({children, ...rest }: Props) => {
  return (
    <section className="py-16 relative overflow-hidden group">
      <SectionMenu {...rest}/>
      <Container className="py-0">{children}</Container>
    </section>
  );
};

export default SectionContainer;
