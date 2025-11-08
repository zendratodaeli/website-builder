import MenuBar, { MenuBarItem } from "@/components/core/menubar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Trash } from "lucide-react";
import { Image } from "@/lib/generated/prisma";
import { Ref, useState } from "react";
import { updateImage } from "@/lib/image/action";
import { toast } from "sonner";
import { ImageForm } from "./image-form";

type Props = {
  id: Image["id"];
  url: Image["url"];
  alt: Image["alt"];
  menuRef: Ref<HTMLDivElement>;
  portalRef: Ref<HTMLDivElement>;
  onDelete?: () => void;
};

export const ImageSectionMenu = ({ id, alt, url, menuRef, portalRef, onDelete }: Props) => {
  
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSubmit = async (url: Image["url"], alt?: Image["alt"]) => {
    const {data, message, error} = await updateImage({id, data: { url, alt }});

      if (data) {
      toast.success(message);
      setIsOpen(false);
    }

    if (error) {
      toast.error(error.message);
    }

  }

  return (
    <MenuBar ref={menuRef} className="absolute -top-14 left-0">
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

          <ImageForm url={url} alt={alt} onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>

      {onDelete && (
        <MenuBarItem onClick={onDelete} variant={"destructive"}>
          <Trash />
        </MenuBarItem>
      )}
    </MenuBar>
  );
};
