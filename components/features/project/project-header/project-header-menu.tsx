"use client"

import { cn } from "@/lib/utils";
import MenuBar, { MenuBarItem } from "@/components/core/menubar";
import { useSidebar } from "@/components/ui/sidebar";
import { Sidebar } from "lucide-react";

const ProjectHeaderMenu = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <div
      className={cn(
        "absolute right-0 top-0 h-full py-8 z-30",
        "translate-x-full group-hover:-translate-x-7",
        "transition-transform duration-300 ease-in-out"
      )}
    >
      <MenuBar className={cn("sticky top-20")} direction="vertical">
        <MenuBarItem onClick={toggleSidebar}>
          <Sidebar/>
        </MenuBarItem>
        
      </MenuBar>
    </div>
  )
}

export default ProjectHeaderMenu;
