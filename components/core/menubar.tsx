import { cn } from "@/lib/utils";
import React, { ComponentProps } from "react";
import { Button } from "../ui/button";
import { Slot } from "@radix-ui/react-slot";

type Props = ComponentProps<"div"> & {
  direction?: "horizontal" | "vertical";
};

const MenuBar = ({ children, className, direction= "horizontal",...rest }: Props) => {
  return (
    <div
      className={cn("bg-primary p-1 flex gap-1 rounded-md z-10", 
        direction === "vertical" && "flex-col",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default MenuBar;


type MenuBarItemProps = ComponentProps<typeof Button> & {
  asChild?: boolean;
}

export const MenuBarItem = ({asChild, size = "icon", className, variant, ...rest}: MenuBarItemProps) => {
  const Comp = asChild ? Slot : Button;

  const isDestructive = variant === "destructive";

  return <Comp size={size} {...rest} className={cn(
    !isDestructive && "hover:bg-accent/20", className)}
    variant={variant} 
    />
}
