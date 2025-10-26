"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import SectionOptions from "./section-options";
import { Section, SectionType } from "@/lib/generated/prisma";
import { VideoForm } from "../video-section/video-form";
import useSectionOptions from "@/hooks/use-section-options";

type Props = {
  children: ReactNode;
  projectId: Section["projectId"];
  index: Section["index"];
  pageId: Section["pageId"];
};

const SectionOptionsDialog = ({ children, projectId, index, pageId }: Props) => {
  const {
    isOpen,
    selectedType,
    createSectionWithType,
    handleDialogChange,
    handleSelect,
  } = useSectionOptions({ index, projectId, pageId });

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="z-1000">
        <DialogHeader>
          <DialogTitle className="text-center">
            Add a section to your website
          </DialogTitle>
        </DialogHeader>

        {selectedType?.includes(SectionType.Video) && (
          <VideoForm
            onSubmit={createSectionWithType.bind(null, selectedType)}
          />
        )}
        
        {!selectedType?.includes(SectionType.Video) && (
          <>
            <SectionOptions onSelect={handleSelect} />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"outline"}>Close</Button>
              </DialogClose>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SectionOptionsDialog;
