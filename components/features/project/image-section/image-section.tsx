"use client";

import MenuBar, { MenuBarItem } from "@/components/core/menubar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useOutsideClick from "@/hooks/use-outside-click";
import { type Image as ImageType } from "@/lib/generated/prisma";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import ImageUpdateForm from "./image-update-form";

type Props = {
  image: ImageType;
};
const ImageSection = ({ image }: Props) => {
  const { alt, caption, url } = image;
  const wrapperRef = useRef<HTMLButtonElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useOutsideClick([wrapperRef, toolbarRef, portalRef], () => {
    setIsEditMode(false);
  });

  const handleEditMode = () => {
    setIsEditMode(true);
  };

  return (
    <div className="relative">
      {/* toolbar */}
      {isEditMode && (
        <MenuBar ref={toolbarRef} className="absolute -top-14 left-0">
          <Dialog>
            <DialogTrigger asChild>
              <MenuBarItem>
                <Pencil />
              </MenuBarItem>
            </DialogTrigger>
            <DialogContent ref={portalRef}>
              <DialogHeader>
                <DialogTitle>Edit Image</DialogTitle>
                <DialogDescription>Add image url to replace</DialogDescription>
              </DialogHeader>

              <ImageUpdateForm image={image} />

            </DialogContent>
          </Dialog>
        </MenuBar>
      )}

      {/* wrapper of the image section */}

      <button
        ref={wrapperRef}
        className={cn(
          "hover:outline outline-offset-4 w-full",
          isEditMode && "outline outline-primary"
        )}
        onClick={handleEditMode}
      >
        <figure className="pointer-events-none">
          <Image src={url} width={1200} height={1200} alt={alt} />
          <figcaption>{caption}</figcaption>
        </figure>
      </button>
    </div>
  );
};

export default ImageSection;
