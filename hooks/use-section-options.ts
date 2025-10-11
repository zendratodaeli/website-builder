import { $Enums, Section, Video } from "@/lib/generated/prisma";
import { createSection } from "@/lib/project/action";
import { useState } from "react";
import { toast } from "sonner";

type Options = {
  index: Section["index"],
  projectId: Section["projectId"];
};

const useSectionOptions = ({ index, projectId }: Options) => {
  const [selectedType, setSelectedType] = useState<$Enums.SectionType | null>(
    null
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const createSectionWithType = async (
    type: $Enums.SectionType,
    url?: Video["url"]
  ) => {
    const { data, error, message } = await createSection({
      index,
      projectId,
      type,
      url,
    });

    if (data) {
      return toast.success(message);
      setIsOpen(false);
      setSelectedType(null);
    }
    if (error) return toast.error(error.message);
  };

  const handleSelect = async (type: $Enums.SectionType) => {
    if (type.includes($Enums.SectionType.Video)) {
      setSelectedType(type);
      
    } else {
      createSectionWithType(type);
      setIsOpen(false);
      setSelectedType(null);
    }
  };

  const handleDialogChange = (isOpen: boolean) => {
    setIsOpen(isOpen);
    setSelectedType(null);
  };

  return {
    isOpen,
    selectedType,
    createSectionWithType,
    handleDialogChange,
    handleSelect,
  };
};

export default useSectionOptions;
