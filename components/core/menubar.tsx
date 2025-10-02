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

export const MenuBarItem = ({asChild, ...rest}: MenuBarItemProps) => {
  const Comp = asChild ? Slot : Button;

  return <Comp {...rest}/>
}
