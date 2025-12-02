import { MenuBarItem } from "@/components/core/menubar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { BarChartHorizontal } from "lucide-react";
import { Attribute } from "../section-container/section-container";

type Props = {attribute: Attribute;
  onAttributeChange: (attribute: Attribute) => void;};

const BackgroundPopover = ({attribute: {opacity, blur}, onAttributeChange}: Props) => {

  return (
    <Popover>
      <PopoverTrigger>
        <MenuBarItem>
          <BarChartHorizontal />
        </MenuBarItem>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              Configure Background Image
            </h4>
            <p className="text-sm text-muted-foreground">
              Try to adjust blur and opacity
            </p>
          </div>

          <div className="space-y-4">
            <Label htmlFor="opacity">Opactiy
              <span>({opacity})</span>
            </Label>
            <Slider 
              id="opacity" 
              max={1} 
              step={0.01}
              value={[opacity]}
              onValueChange={(value) => onAttributeChange({blur, opacity: value[0]})}
            />

            <Label htmlFor="opacity">Blur
              <span>({blur}px)</span>
            </Label>
            <Slider 
              id="blur" 
              step={1}
              value={[blur]}
              onValueChange={(value) => onAttributeChange({opacity, blur: value[0]})}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BackgroundPopover;
