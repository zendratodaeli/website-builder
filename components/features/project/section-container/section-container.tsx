"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Container from "@/components/core/container";
import { SectionWithAll } from "@/lib/project/types";
import SectionContainerMenu from "./section-container-menu";
import useDebounce from "@/hook/use-debounce";
import { updateSection } from "@/lib/project/action";
import SectionContainerPaddings from "./section-container-paddings";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  section: SectionWithAll;
  className?: string
};

export type Padding = {
  paddingTop: number;
  paddingBottom: number;
};

const SectionContainer = ({ children, section, className }: Props) => {
  const [{ paddingTop, paddingBottom }, setPadding] = useState<Padding>({
    paddingTop: section.paddingTop,
    paddingBottom: section.paddingBottom,
  });

  const { top, bottom } = useDebounce(
    { top: paddingTop, bottom: paddingBottom },
    1000
  );

  useEffect(() => {
    updateSection({
      id: section.id,
      data: {
        paddingTop: top,
        paddingBottom: bottom,
      },
    });
  }, [top, bottom, section.id]);

  return (
    <section className="relative overflow-x-clip group">
      <SectionContainerMenu section={section} />

      <SectionContainerPaddings
        paddings={{ paddingTop, paddingBottom }}
        onPaddingChange={setPadding}
      />

      <Container
        className={cn(className)}
        style={{ paddingTop, paddingBottom, transition: "padding 0.2s ease" }}
      >
        {children}
      </Container>
    </section>
  );
};

export default SectionContainer;
