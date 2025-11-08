import { cn } from "@/lib/utils";
import { ReactNode, Ref } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  wrapperRef: Ref<HTMLDivElement>;
  isMenuShown: boolean;
  onClick: () => void;
};
const SectionWrapper = ({
  children,
  className,
  wrapperRef,
  isMenuShown,
  onClick,
}: Props) => {
  return (
    <div
      role="button"
      ref={wrapperRef}
      className={cn(
        "relative w-full",
        "hover:outline outline-offset-4",
        isMenuShown && "outline outline-primary",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default SectionWrapper;
