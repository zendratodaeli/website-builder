import React, { ReactNode } from "react";
import Container from "@/components/core/container";
import SectionMenu from "./section-menu";
import { Section } from "@/lib/generated/prisma";

type Props = {
  children: ReactNode;
  id: Section["id"]
};

const SectionContainer = ({ id, children }: Props) => {
  return (
    <section className="py-16 relative overflow-hidden group">
      <SectionMenu id={id}/>
      <Container asChild>{children}</Container>
    </section>
  );
};

export default SectionContainer;
