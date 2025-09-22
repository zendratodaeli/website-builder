import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Trash2 } from "lucide-react";
import ProjectDeleteDialog from "./projects-delete-dialog";
import { Project } from "@/lib/generated/prisma";

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
          <ProjectDeleteDialog id={id}>
            <Button className="w-full justify-start text-destructive hover:text-primary-foreground hover:bg-destructive font-extrabold">
              <Trash2 />
              <span>Delete</span>
            </Button>
          </ProjectDeleteDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectsDropdown;
