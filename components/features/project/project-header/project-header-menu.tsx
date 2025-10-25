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
        "h-full py-8",
        "absolute -right-12 z-30",
        "group-hover:-translate-x-19",
        "duration-300"
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
