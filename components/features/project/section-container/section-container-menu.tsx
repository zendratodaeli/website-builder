import { BarChartHorizontal, ImageIcon, ImageMinus, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import DeleteDialog from "@/components/core/delete-dialog";
import { deleteSection } from "@/lib/project/action";
import MenuBar, { MenuBarItem } from "@/components/core/menubar";
import AddLinkButton from "../external-link/add-link-button";
import { SectionWithAll } from "@/lib/project/types";
import { SectionBackground, SectionType } from "@/lib/generated/prisma";
import ReorderButton from "../sections/reorder-button";
import GallerySectionAdd from "../gallery-section/gallery-section-add";
import GallerySectionToCarousel from "../gallery-section/gallery-section-to-carousel";
import GallerySectionToGrid from "../gallery-section/gallery-section-to-grid";
import BackgroundPopover from "../background/background-popover";
import { Attribute } from "./section-container";
import BackgroundAddDialog from "../background/background-add-dialog";

type Props = {
  section: SectionWithAll;
  attribute: Attribute;
  onAttributeChange: (attribute: Attribute) => void;
  onAddBackground: (
    url: SectionBackground["url"], 
    alt?: SectionBackground["alt"]
  ) => void;
  onDeleteBackground: (id: SectionBackground["id"]) => void;
};

const SectionContainerMenu = ({
  section: { id, items, type, background },
  attribute,
  onAttributeChange,
  onAddBackground,
  onDeleteBackground
}: Props) => {
  const text = items[0]?.text;
  const isTextSection = type === SectionType.Text && text;
  const isReorderable =
    type === SectionType.TextImage || type === SectionType.TextVideo;

  const isGalleryGridSection = type === SectionType.GalleryGrid;
  const isGalleryCarouselSection = type === SectionType.GalleryCarousel;
  const isGallerySection = isGalleryGridSection || isGalleryCarouselSection;

  return (
    <div
      className={cn(
        // "absolute top-1/2 -translate-y-1/2 -right-12 z-30",
        // "group-hover:-translate-x-16",
        // "duration-300"

        "h-full py-8",
        "absolute -right-12 z-30",
        "group-hover:-translate-x-19 has-[[data-state=open]]:-translate-x-16",
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
          <>
            <AddLinkButton textId={text.id} linkId={text.externalLink?.id} />
            {background ? (
              <>
                <MenuBarItem onClick={() => onDeleteBackground(background.id)}>
                  <ImageMinus />
                </MenuBarItem>
                <BackgroundPopover
                  attribute={attribute}
                  onAttributeChange={onAttributeChange}
                />
              </>
            ) : (
              <BackgroundAddDialog onAddBackground={onAddBackground}/>
              
            )}
          </>
        )}

        {isReorderable && <ReorderButton sectionItems={items} />}

        {isGallerySection && <GallerySectionAdd sectionId={id} />}

        {isGalleryGridSection && <GallerySectionToCarousel id={id} />}

        {isGalleryCarouselSection && <GallerySectionToGrid id={id} />}
      </MenuBar>
    </div>
  );
};

export default SectionContainerMenu;
