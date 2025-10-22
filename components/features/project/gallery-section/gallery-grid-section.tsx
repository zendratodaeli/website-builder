"use client";

import { SectionItemWithAll } from "@/lib/project/types";
import ImageSection from "../image-section/image-section";
import { deleteSectionItem, reorderSectionItems } from "@/lib/section-item/action";
import { SortableItem, SortableList } from "@/components/core/sortable";
import { startTransition, useOptimistic } from "react";
import { toast } from "sonner";

type Props = {
  sectionItems: SectionItemWithAll[];
};
const GalleryGridSection = ({ sectionItems }: Props) => {
  const [optimisticItem, action] = useOptimistic<SectionItemWithAll[], SectionItemWithAll[]>(
    sectionItems,
    (_, action) => action
  );

  const handleReorder = (newOrder: SectionItemWithAll[]) => {
    startTransition(async() =>{
      action(newOrder);
      const {data, message} = await reorderSectionItems(newOrder)

      if(data) {
        toast.message(message)
      }
    })
  };
  return (
    <SortableList className="grid grid-cols-4 gap-8" items={optimisticItem} onReorder={handleReorder}>
      {sectionItems.map((item) => (
        <SortableItem key={item.id} id={item.id}>
          {item.image && (
            <ImageSection
              image={item.image}
              onDelete={() => deleteSectionItem(item.id)}
            />
          )}
        </SortableItem>
      ))}
    </SortableList>
  );
};

export default GalleryGridSection;