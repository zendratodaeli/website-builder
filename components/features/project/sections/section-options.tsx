import { $Enums } from "@/lib/generated/prisma";
import SectionOptionItem from "./section-option-item";
import { SECTION_OPTIONS } from "@/lib/project/constants";

type Props = {
  onSelect: (type: $Enums.SectionType) => void;
};


const SectionOptions = ({ onSelect }: Props) => {
  return (
    <ul className="py-16 grid grid-cols-4 gap-4">
      {SECTION_OPTIONS.map((option) => (
        <SectionOptionItem
          key={option.label}
          option={option}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
};

export default SectionOptions;
