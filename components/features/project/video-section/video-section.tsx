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

import { useRef, useState } from "react";
import useOutsideClick from "@/hooks/use-outside-click";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { VideoForm } from "./video-form";
import { Video } from "@/lib/generated/prisma";
import { updateVideo } from "@/lib/video/action";
import { toast } from "sonner";

type Props = {
  video: Video;
};

const VideoSection = ({ video: { url, id } }: Props) => {
  const wrapperRef = useRef<HTMLButtonElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const handleEditMode = () => {
    setIsEditMode(true);
  };

  useOutsideClick([wrapperRef, toolbarRef, portalRef], () => {
    setIsEditMode(false);
  });

  const updateUrl = async (newUrl: Video["url"]) => {
    const { data, message } = await updateVideo({ id, data: { url: newUrl } });
    if (data) return toast.success(message);
    setIsOpen(false);
  };

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
                <DialogTitle>Edit Video</DialogTitle>
                <DialogDescription>Add video url to replace</DialogDescription>
              </DialogHeader>
              <VideoForm url={url} onSubmit={updateUrl} />
            </DialogContent>
          </Dialog>
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
        {/* rendering a video */}
        <iframe
          className={cn("aspect-video", !isEditMode && "pointer-events-none")}
          width="100%"
          height="100%"
          src={url}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </button>
    </div>
  );
};

export default VideoSection;
