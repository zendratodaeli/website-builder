"use client";

import { $Enums, Image, Section } from "@/lib/generated/prisma";
import { TextWithExternalLink } from "@/lib/project/types";
import TextEditor from "../text-section/text-editor";
import ImageSection from "../image-section/image-section";
import { cn } from "@/lib/utils";
import { Reorder } from "motion/react";
import { updateSection } from "@/lib/project/action";

type Props = {
  sectionId: Section["id"];
  text: TextWithExternalLink;
  image: Image;
  isReversed: boolean;
};

const TextImageSection = ({sectionId, text, image, isReversed }: Props) => {
  const orders = [$Enums.SectionType.Text, $Enums.SectionType.Image];
  const items = isReversed ? orders.reverse() : orders;

  const handleReorder = () => {
    updateSection({id: sectionId, data: { isReversed: !isReversed}})
  };

  return (
    <Reorder.Group
      axis="x"
      values={items}
      onReorder={handleReorder}
      className={cn("flex items-center gap-16")}
    >
      {items.map((item) => (
        <Reorder.Item className="flex-1" key={item} value={item}>
          { item === $Enums.SectionType.Text && <TextEditor text={text} />}
          { item === $Enums.SectionType.Image && <ImageSection image={image} />}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default TextImageSection;
