import MenuBar, { MenuBarItem } from "@/components/core/menubar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { VideoForm } from "./video-form";
import { Ref, useState } from "react";
import { Video } from "@/lib/generated/prisma";
import { toast } from "sonner";
import { updateVideo } from "@/lib/video/action";

type Props = {
  id: Video["id"];
  url: Video["url"];
  menuRef: Ref<HTMLDivElement>;
  portalRef: Ref<HTMLDivElement>
};

const VideoSectionMenu = ({id, url, menuRef, portalRef}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const updateUrl = async (newUrl: Video["url"]) => {
    const { data, message } = await updateVideo({ id, data: { url: newUrl } });
    
    if (data) return toast.success(message);
    setIsOpen(false);
  };

  return (
    <MenuBar ref={menuRef} className="absolute -top-14 left-0">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <MenuBarItem>
            <Pencil />
          </MenuBarItem>
        </DialogTrigger>
        <DialogContent ref={portalRef} className="z-1000">
          <DialogHeader>
            <DialogTitle>Edit Video</DialogTitle>
            <DialogDescription>Add video url to replace</DialogDescription>
          </DialogHeader>
          <VideoForm url={url} onSubmit={updateUrl} />
        </DialogContent>
      </Dialog>
    </MenuBar>
  );
};

export default VideoSectionMenu;
