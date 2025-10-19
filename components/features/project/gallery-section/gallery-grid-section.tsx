"use client"

import { SectionItemWithAll } from "@/lib/project/types"
import ImageSection from "../image-section/image-section";
import { deleteSectionItem } from "@/lib/section-item/action";

type Props = {
  sectionItems: SectionItemWithAll[];
}
const GalleryGridSection = ({sectionItems}: Props) => {
  return (
    <ul className="grid grid-cols-4 gap-8">
      {sectionItems.map(item => (
        <li key={item.id}>
          {item.image && <ImageSection image={item.image} onDelete={() => deleteSectionItem(item.id)} /> }
        </li>
      ))}
    </ul>
  )
}

export default GalleryGridSection
