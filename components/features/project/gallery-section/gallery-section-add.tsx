import { MenuBarItem } from "@/components/core/menubar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Image, Section } from "@/lib/generated/prisma";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { ImageForm } from "../image-section/image-form";
import { createSectionItem } from "@/lib/section-item/action";
import { toast } from "sonner";

type Props = {
  sectionId: Section["id"];

};

const GallerySectionAdd = ({sectionId}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const createImageSectionItem = async (url: Image["url"], alt?: Image["alt"]) => {
    const {data, message} = await createSectionItem(sectionId, url, alt)
    
    if(data) return toast.message(message);

  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <MenuBarItem>
          <Plus />
        </MenuBarItem>
      </DialogTrigger>
      <DialogContent className="z-1000">
        <DialogHeader>
          <DialogTitle>Add Image</DialogTitle>
          <DialogDescription>Feel free to add image in your gallery!</DialogDescription>
        </DialogHeader>
        <ImageForm onSubmit={createImageSectionItem} />
      </DialogContent>
    </Dialog>
  );
};

export default GallerySectionAdd;
