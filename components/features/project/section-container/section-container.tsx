"use client";

import React, { ReactNode, use, useCallback, useEffect, useState } from "react";
import Container from "@/components/core/container";
import { SectionWithAll } from "@/lib/project/types";
import SectionContainerMenu from "./section-container-menu";
import useDebounce from "@/hooks/use-debounce";
import { updateSection } from "@/lib/project/action";
import SectionContainerPaddings from "./section-container-paddings";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { SectionBackground } from "@/lib/generated/prisma";
import useActionToast from "@/hooks/use-action-toast";
import { createBackground, deleteBackground, updateBackground } from "@/lib/background/action";

type Props = {
  children: ReactNode;
  section: SectionWithAll;
  className?: string
};

export type Attribute = {
  opacity: number;
  blur: number;
}

export type Padding = {
  paddingTop: number;
  paddingBottom: number;
};

const SectionContainer = ({ children, section, className }: Props) => {
  const {id, background} = section;
  const toast = useActionToast();
  const [{ paddingTop, paddingBottom }, setPadding] = useState<Padding>({
    paddingTop: section.paddingTop,
    paddingBottom: section.paddingBottom,
  });

  const { top, bottom } = useDebounce(
    { top: paddingTop, bottom: paddingBottom },
    1000
  );

  const [backgroundImage, setBackgroundImage] = useState<string | null>(
    section.background?.url || null
  );

  const addbackgroundImage = async(
    url: SectionBackground["url"], 
    alt?: SectionBackground["alt"]
  ) => {
    setBackgroundImage(url);

    const state = await createBackground({data: {url, alt, section: {connect: {id}}}});
    toast(state);
  }

  const deleteBackgroundImage = async (id: SectionBackground["id"]) => {
    setBackgroundImage(null);

    const state = await deleteBackground(id);
    toast(state);
  }

  useEffect(() => {
    updateSection({
      id: section.id,
      data: {
        paddingTop: top,
        paddingBottom: bottom,
      },
    });
  }, [top, bottom, section.id]);


  const [attribute, setAttribute] = useState<Attribute>({
    opacity: background?.opacity || 1, 
    blur: background?.blur || 0
  })
  
  const changeAttribute = (attributes: Attribute) => {
    setAttribute(attributes)
  }

  const {opacity, blur} = useDebounce(attribute, 1000);

  const updateBackgroundImage = useCallback(async (
    id: SectionBackground["id"],
    opacity: SectionBackground["opacity"],
    blur: SectionBackground["blur"]
  ) => {
   const state = await updateBackground({id, data: { opacity, blur },});
    toast(state);
  }, [toast]);

  useEffect(() => {
    if (background && (background.opacity !== opacity || background.blur !== blur)) {
      updateBackgroundImage(background.id, opacity, blur);
    }
  }, [opacity, blur, background, updateBackgroundImage]);

  
  return (
    <section className="relative overflow-x-clip group">
      {backgroundImage && (
        <Image
          style={{ opacity: attribute.opacity, filter: `blur(${attribute.blur}px)`}}
          src={backgroundImage}
          fill
          alt="background-image"
        />
      )}
      
      <SectionContainerMenu 
        section={section} 
        attribute={attribute}
        onAttributeChange={changeAttribute}
        onAddBackground={addbackgroundImage}
        onDeleteBackground={deleteBackgroundImage}
      />

      <SectionContainerPaddings
        paddings={{ paddingTop, paddingBottom }}
        onPaddingChange={setPadding}
      />

      <Container
        className={cn("grid",className)}
        style={{ paddingTop, paddingBottom, transition: "padding 0.2s ease" }}
      >
        {children}
      </Container>
    </section>
  );
};

export default SectionContainer;
