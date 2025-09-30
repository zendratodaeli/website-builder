import React, { ReactNode } from "react";
import Container from "@/components/core/container";
import SectionMenu from "./section-menu";

type Props = {
  children: ReactNode;
};

const SectionContainer = ({ children }: Props) => {
  return (
    <section className="py-16 relative overflow-hidden group">
      <SectionMenu/>
      <Container asChild>{children}</Container>
    </section>
  );
};

export default SectionContainer;
