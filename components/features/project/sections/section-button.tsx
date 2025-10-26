import React from "react";
import SectionOptionsDialog from "./section-options-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Section } from "@/lib/generated/prisma";

type Props = {
  projectId: Section["projectId"];
  index: Section["index"];
  pageId: Section["pageId"];
};

const SectionButton = ({ ...rest }: Props) => {
  return (
    <div className="border-t relative hover:border-primary">
      <SectionOptionsDialog {...rest}>
        <Button
          size={"icon"}
          className="absolute top-0 left-1/2 -translate-1/2 z-10"
        >
          {" "}
          <Plus />{" "}
        </Button>
      </SectionOptionsDialog>
    </div>
  );
};

export default SectionButton;
