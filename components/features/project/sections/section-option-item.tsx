import { Button } from "@/components/ui/button";
import { $Enums } from "@/lib/generated/prisma";
import { SECTION_OPTIONS } from "@/lib/project/constants";

type Props = {
  option: (typeof SECTION_OPTIONS)[number];
  onSelect: (type: $Enums.SectionType) => void;
};
const SectionOptionItem = ({
  option: { label, icon, type },
  onSelect,
}: Props) => {

  const handleClick = () => {
    onSelect(type);
  };
  
  return (
    <li className="flex justify-center items-center">
      <Button
        variant={"plain"}
        size={"none"}
        className="group flex flex-col items-center gap-2"
        onClick={handleClick}
      >
        <div className="group-hover:bg-accent p-4">{icon}</div>
        <span className="text-muted-foreground hover:text-foreground text-xs">
          {label}
        </span>
      </Button>
    </li>
  );
};

export default SectionOptionItem;
