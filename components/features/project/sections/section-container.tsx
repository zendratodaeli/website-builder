import React, { ReactNode } from "react";
import Container from "@/components/core/container";
import SectionMenu from "./section-menu";
import { SectionWithAll } from "@/lib/project/types";

type Props = {
  children: ReactNode;
  section: SectionWithAll
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
