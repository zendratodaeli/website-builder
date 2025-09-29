"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import SectionOptions from "./section-options";
import { Section } from "@/lib/generated/prisma";

type Props = {
  children: ReactNode;
  projectId: Section["projectId"];
  index: Section["index"];
};

const SectionOptionsDialog = ({ children, projectId, index }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a section to your website</DialogTitle>
        </DialogHeader>

        <SectionOptions projectId={projectId} index={index} />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SectionOptionsDialog;
