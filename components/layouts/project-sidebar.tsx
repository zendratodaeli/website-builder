"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import Pages from "../features/project/pages/pages"
import { Page } from "@/lib/generated/prisma";

type Props = {
  pages: Page[];
}

export function ProjectSidebar({pages}: Props) {
  return (
    <Sidebar className="dark text-foreground pt-33 bg-black">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <Pages pages={pages} />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}