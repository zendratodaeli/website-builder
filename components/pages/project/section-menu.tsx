import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";

const SectionMenu = () => {
  return (
    <div
      className={cn(
        "bg-primary p-1 flex flex-col gap-1 rounded-md",
        "absolute top-1/2 -translate-y-1/2 -right-12",
        "group-hover:-translate-x-16",
        "duration-300"
      )}
    >
      <Button variant={"destructive"}>
        <Trash />
      </Button>
    </div>
  );
};

export default SectionMenu;
