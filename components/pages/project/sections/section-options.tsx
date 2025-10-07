import { Button } from "@/components/ui/button";
import { $Enums, Section } from "@/lib/generated/prisma";
import { createSection } from "@/lib/project/action";
import { ImagePlus, ListPlus } from "lucide-react";
import { toast } from "sonner";

type Props = {
  projectId: Section["projectId"];
  index: Section["index"];
};


const SectionOptions = ({index, projectId}: Props) => {
  const handleClick = async (type: $Enums.SectionType) => {
    // send server action
    const {data, error, message} = await createSection({
      index, 
      projectId, 
      type
    });

    if(data) return toast.success(message);
    if(error) return toast.error(error.message)
  };

  return (
    <ul className="py-16 grid grid-cols-4 gap-4">
      <li className="flex justify-center items-center">
        <Button
          variant={"plain"}
          size={"none"}
          className="group flex flex-col items-center gap-2"
          onClick={() => {handleClick($Enums.SectionType.Text)}}
        >
          <div className="group-hover:bg-accent p-4">
            <ListPlus className="size-10 group-hover:bg-accent" />
          </div>
          <span className="text-muted-foreground hover:text-foreground text-xs">
            Text
          </span>
        </Button>
      </li>

      <li className="flex justify-center items-center">
        <Button
          variant={"plain"}
          size={"none"}
          className="group flex flex-col items-center gap-2"
          onClick={() => {handleClick($Enums.SectionType.Image)}}
        >
          <div className="group-hover:bg-accent p-4">
            <ImagePlus className="size-10 group-hover:bg-accent" />
          </div>
          <span className="text-muted-foreground hover:text-foreground text-xs">
            Image
          </span>
        </Button>
      </li>
    </ul>
  );
};

export default SectionOptions;
