import { Plus, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import DeleteDialog from "@/components/core/delete-dialog";
import { deleteSection } from "@/lib/project/action";
import MenuBar, { MenuBarItem } from "@/components/core/menubar";
import AddLinkButton from "../external-link/add-link-button";
import { SectionWithAll } from "@/lib/project/types";
import { SectionType } from "@/lib/generated/prisma";
import ReorderButton from "../sections/reorder-button";
import GallerySectionAdd from "../gallery-section/gallery-section-add";

type Props = {
  section: SectionWithAll;
};

const SectionContainerMenu = ({ section: { id, items, type } }: Props) => {
  const text = items[0]?.text;
  const isTextSection = type === SectionType.Text && text;
  const isGallerySection = type === SectionType.GalleryGrid;

  const isReorderable =
    type === SectionType.TextImage || type === SectionType.TextVideo;

  return (
    <div
      className={cn(
        // "absolute top-1/2 -translate-y-1/2 -right-12 z-30",
        // "group-hover:-translate-x-16",
        // "duration-300"

        "h-full py-8",
        "absolute -right-12 z-30",
        "group-hover:-translate-x-19",
        "duration-300"
      )}
    >
      <MenuBar className={cn("sticky top-20")} direction="vertical">
        <DeleteDialog action={deleteSection.bind(null, { id })}>
          <MenuBarItem variant={"destructive"} size={"icon"}>
            <Trash />
          </MenuBarItem>
        </DeleteDialog>

        {isTextSection && (
          <AddLinkButton textId={text.id} linkId={text.externalLink?.id} />
        )}

        {isReorderable && <ReorderButton sectionItems={items} />}

        {isGallerySection && (
          <GallerySectionAdd sectionId={id}/>
        )}
      </MenuBar>
    </div>
  );
};

export default SectionContainerMenu;
