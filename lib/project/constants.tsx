import { ArrowLeft, ArrowRight, ImagePlus, LayoutGrid, LayoutList, ListPlus, Video } from "lucide-react";
import { DirectionEnum } from "./types";
import { $Enums } from "../generated/prisma";

export const POSITION_BUTTONS = [
  {
    icon: <ArrowLeft />,
    direction: DirectionEnum.Left,
    className: "left-0 group-hover:-translate-x-12",
  },
  {
    icon: <ArrowRight />,
    direction: DirectionEnum.Right,
    className: "right-0 group-hover:translate-x-12",
  },
] as const;

export const SECTION_OPTIONS = [
  {
    label: "Text",
    icon: <ListPlus className="size-10 group-hover:bg-accent" />,
    type: $Enums.SectionType.Text,
  },
  {
    label: "Image",
    icon: <ImagePlus className="size-10 group-hover:bg-accent" />,
    type: $Enums.SectionType.Image,
  },
  {
    label: "Text & Image",
    icon: <LayoutList className="size-10 group-hover:bg-accent" />,
    type: $Enums.SectionType.TextImage,
  },
  {
    label: "Video",
    icon: <Video className="size-10 group-hover:bg-accent" />,
    type: $Enums.SectionType.Video,
  },
  {
    label: "Text & Video",
    icon: <LayoutList className="size-10 group-hover:bg-accent" />,
    type: $Enums.SectionType.TextVideo,
  },
  {
    label: "Gallery",
    icon: <LayoutGrid className="size-10 group-hover:bg-accent" />,
    type: $Enums.SectionType.GalleryGrid,
  },
] as const;