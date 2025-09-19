import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import ProjectsDeleteForm from "./projects-delete-form";
import { Project } from "@/lib/generated/prisma";

type Props = {
  children: ReactNode;
  id: Project["id"]
}

const ProjectDeleteDialog = ({children, id}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutey sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanantly delete your
            project!
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <ProjectsDeleteForm id={id}/>
          <DialogClose asChild>
            <Button variant={"outline"}>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDeleteDialog;