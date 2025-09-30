import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Trash2 } from "lucide-react";
import DeleteDialog from "../../core/delete-dialog";
import { Project } from "@/lib/generated/prisma";
import { deleteProject } from "@/lib/projects/actions";

type Props = {
  id: Project["id"]
}


const ProjectsDropdown = ({id}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="absolute top-4 right-4">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-primary" align="end">
        <DropdownMenuItem asChild>
          <DeleteDialog action={deleteProject.bind(null, { id})}>
            <Button className="w-full justify-start text-destructive hover:text-primary-foreground hover:bg-destructive font-extrabold">
              <Trash2 />
              <span>Delete</span>
            </Button>
          </DeleteDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectsDropdown;
