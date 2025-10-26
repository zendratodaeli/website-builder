"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import PagesForm from "./pages-form";
import { Page } from "@/lib/generated/prisma";
import { updatePage } from "@/lib/pages/action";
import { useState } from "react";

type Props = {
  id: Page["id"];
  label: Page["label"];
  href: Page["href"];
};

const PagesEditDialog = ({ label, href, id }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const update = (label: Page["label"], href: Page["href"]) => {
    updatePage({
      id,
      data: {
        label,
        href
      }
    });

    setIsOpen(false)
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="z-1000">
        <DialogHeader>
          <DialogTitle>Edit Page</DialogTitle>
        </DialogHeader>
        <PagesForm onSubmit={update} label={label} href={href} />
      </DialogContent>
    </Dialog>
  );
};

export default PagesEditDialog;
