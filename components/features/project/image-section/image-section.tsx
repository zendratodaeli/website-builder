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
import { Pencil, Trash } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";
import ImageUpdateForm from "./image-update-form";
import { updateImage } from "@/lib/image/action";
import { ActionsState, StatusCode } from "@/lib/types";
import { toast } from "sonner";
import Image from "next/image";

type Props = {
  image: ImageType;
  onDelete?: () => void;
};
const ImageSection = ({ image, onDelete }: Props) => {
  const { id, alt, caption, url } = image;
  const wrapperRef = useRef<HTMLButtonElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const updateImageWithId = updateImage.bind(null, id);
  const [{ code, data, message, error }, action] = useActionState<
    ActionsState<ImageType>,
    FormData
  >(updateImageWithId, {});

  useEffect(() => {
    if (data) {
      toast.success(message);
      setIsOpen(false);
    }

    if (error && code !== StatusCode.BadRequest) {
      toast.error(error.message);
    }
  }, [code, data, error, message]);

  const handleEditMode = () => {
    setIsEditMode(true);
  };

  useOutsideClick([wrapperRef, toolbarRef, portalRef], () => {
    setIsEditMode(false);
  });

  return (
    <div className="relative">
      {isEditMode && (
        <MenuBar ref={toolbarRef} className="absolute -top-14 left-0">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
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

              <ImageUpdateForm action={action} image={image} />
            </DialogContent>
          </Dialog>

          {onDelete && (
            <MenuBarItem onClick={onDelete} variant={"destructive"}>
              <Trash />
            </MenuBarItem>
          )}
        </MenuBar>
      )}

      <button
        ref={wrapperRef}
        className={cn(
          "hover:outline outline-offset-4 w-full",
          isEditMode && "outline outline-primary"
        )}
        onClick={handleEditMode}
      >
        <figure className="pointer-events-none">
          <Image
            className="aspect-square"
            src={url}
            width={1200}
            height={1200}
            alt={alt}
          />
          <figcaption>{caption}</figcaption>
        </figure>
      </button>
    </div>
  );
};

export default ImageSection;
