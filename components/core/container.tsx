import { cn } from "@/lib/utils";
import React, { ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";

type Props = ComponentProps<"div"> & {
  asChild?: boolean;
};

const Container = ({
  asChild = false,
  className,
  children,
  ...rest
}: Props) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp className={cn("container mx-auto p-12", className)} {...rest}>
      {children}
    </Comp>
  );
};

export default Container;
