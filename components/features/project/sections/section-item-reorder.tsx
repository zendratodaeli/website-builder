"use client";

import { SectionItemWithAll } from "@/lib/project/types";
import TextEditor from "../text-section/text-editor";
import ImageSection from "../image-section/image-section";
import { cn } from "@/lib/utils";
import { Reorder } from "motion/react";
import { reorderSectionItems } from "@/lib/section-item/action";
import { toast } from "sonner";
import VideoSection from "../video-section/video-section";

type Props = {
  sectionItems: SectionItemWithAll[]
};

const SectionItemReorder = ({sectionItems}: Props) => {

  const handleReorder = async (newOrder: SectionItemWithAll[]) => {
    const {data, message} = await reorderSectionItems(newOrder);
    if(data) return toast.success(message);

  };

  return (
    <Reorder.Group
      axis="x"
      values={sectionItems}
      onReorder={handleReorder}
      className={cn("flex items-center gap-16")}
    >
      {sectionItems.map((item) => (
        <Reorder.Item className="flex-1" key={item.id} value={item}>
          { item.text && <TextEditor text={item.text} />}
          { item.image && <ImageSection image={item.image} />}
          { item.video && <VideoSection video={item.video} />}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default SectionItemReorder;
