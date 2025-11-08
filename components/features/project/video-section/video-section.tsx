"use client";

import { useRef, useState } from "react";
import useOutsideClick from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import { Video } from "@/lib/generated/prisma";
import { updateVideo } from "@/lib/video/action";
import { toast } from "sonner";
import VideoSectionMenu from "./video-section-menu";
import SectionWrapper from "../section-wrapper/section-wrapper";
import useSectionWrapper from "@/hooks/use-section-wrapper";

type Props = {
  video: Video;
};

const VideoSection = ({ video: { url, id } }: Props) => {
  const {wrapperRef, menuRef, portalRef, isMenuShown, showMenu} = useSectionWrapper()

  return (
    <SectionWrapper
      wrapperRef={wrapperRef}
      isMenuShown={isMenuShown}
      onClick={showMenu}
    >
      {isMenuShown && (
        <VideoSectionMenu
          id={id}
          url={url}
          menuRef={menuRef}
          portalRef={portalRef}
        />
      )}
      <iframe
        className={cn("aspect-video", !isMenuShown && "pointer-events-none")}
        width="100%"
        height="100%"
        src={url}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </SectionWrapper>
  );
};

export default VideoSection;
