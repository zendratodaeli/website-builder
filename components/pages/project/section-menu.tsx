import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import DeleteDialog from "@/components/core/delete-dialog";
import { deleteSection } from "@/lib/project/action";
import { Section } from "@/lib/generated/prisma";
import MenuBar, { MenuBarItem } from "@/components/core/menubar";
import AddLinkButton from "./add-link-button";
import { TextWithExternalLink } from "@/lib/project/types";

type Props = {
  id: Section["id"];
  text: TextWithExternalLink | null;
};

const SectionMenu = ({ id, text }: Props) => {
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

      {text && <AddLinkButton textId={text.id} linkId={text.externalLink?.id} />}
    </MenuBar>
  );
};

export default SectionMenu;
