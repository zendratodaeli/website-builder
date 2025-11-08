"use client";

import useOutsideClick from "@/hooks/use-outside-click";
import { type Image as ImageType } from "@/lib/generated/prisma";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import Image from "next/image";
import { ImageSectionMenu } from "./image-section-menu";
import SectionWrapper from "../section-wrapper/section-wrapper";
import useSectionWrapper from "@/hooks/use-section-wrapper";

type Props = {
  image: ImageType;
  onDelete?: () => void;
};
const ImageSection = ({ image: { id, alt, caption, url }, onDelete }: Props) => {
  const {isMenuShown, menuRef, portalRef, showMenu, wrapperRef} = useSectionWrapper();

  return (
      <SectionWrapper
        wrapperRef={wrapperRef}
        isMenuShown={isMenuShown}
        onClick={showMenu}
      >
        {isMenuShown && (
        <ImageSectionMenu 
          menuRef={menuRef} 
          portalRef={portalRef} 
          onDelete={onDelete} 
          alt={alt}
          url={url}
          id={id}
        />
        )}
        
        <figure className="pointer-events-none">
          <Image
            className="aspect-square"
            src={url}
            width={1200}
            height={1200}
            alt={alt}
          />
          <figcaption>{caption}</figcaption>
        </figure>
      </SectionWrapper>
  );
};

export default ImageSection;
