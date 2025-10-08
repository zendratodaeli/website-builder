import { ArrowLeftRight, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import DeleteDialog from "@/components/core/delete-dialog";
import { deleteSection } from "@/lib/project/action";
import MenuBar, { MenuBarItem } from "@/components/core/menubar";
import AddLinkButton from "../external-link/add-link-button";
import { SectionWithAll } from "@/lib/project/types";
import TextImageSwapButton from "../text-image-section/text-image-swap-button";

type Props = {
  section: SectionWithAll;
};

const SectionMenu = ({ section: { id, text, isReversed, image } }: Props) => {
  return (
    <MenuBar
      className={cn(
        "absolute top-1/2 -translate-y-1/2 -right-12",
        "group-hover:-translate-x-16",
        "duration-300"
      )}
      direction="vertical"
    >
      <DeleteDialog action={deleteSection.bind(null, { id })}>
        <MenuBarItem variant={"destructive"} size={"icon"}>
          <Trash />
        </MenuBarItem>
      </DeleteDialog>

      {text && (
        <AddLinkButton textId={text.id} linkId={text.externalLink?.id} />
      )}

      {text && image && <TextImageSwapButton isReversed={isReversed} id={id} />}
    </MenuBar>
  );
};

export default SectionMenu;
