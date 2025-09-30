import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import DeleteDialog from "@/components/core/delete-dialog";
import { deleteSection } from "@/lib/project/action";
import { Section } from "@/lib/generated/prisma";

type Props = {
  id: Section["id"]
}

const SectionMenu = ({id}: Props) => {
  return (
    <div
      className={cn(
        "bg-primary p-1 flex flex-col gap-1 rounded-md",
        "absolute top-1/2 -translate-y-1/2 -right-12",
        "group-hover:-translate-x-16",
        "duration-300"
      )}
    >
      <DeleteDialog action={deleteSection.bind(null, { id })}>

      <Button variant={"destructive"}>
        <Trash />
      </Button>
      </DeleteDialog>
    </div>
  );
};

export default SectionMenu;
