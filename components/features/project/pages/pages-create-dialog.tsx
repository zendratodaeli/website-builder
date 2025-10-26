"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import PagesForm from "./pages-form";
import { Page } from "@/lib/generated/prisma";
import { createPage } from "@/lib/pages/action";
import { useState } from "react";

type Props = {
  index: Page["index"];
  projectId: Page["projectId"];
};

const PagesCreateDialog = ({index, projectId}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const create = (label: Page["label"], href: Page["href"]) => {
    createPage({
      data: {
        label,
        href,
        index,
        project: {
          connect: {
            id: projectId
          }
        }
      }
    });

    setIsOpen(false)
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <Plus />
          <span>Add New Page</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="z-1000">
        <DialogHeader>
          <DialogTitle>Create New Page</DialogTitle>
        </DialogHeader>
        <PagesForm onSubmit={create} />
      </DialogContent>
    </Dialog>
  );
};

export default PagesCreateDialog;
