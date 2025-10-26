import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Pages from "../features/project/pages/pages";
import { Page } from "@/lib/generated/prisma";
import PagesCreateDialog from "../features/project/pages/pages-create-dialog";

type Props = {
  pages: Page[];
};

export function ProjectSidebar({ pages }: Props) {
  console.log(pages, "pages")
  return (
    <Sidebar className="dark text-foreground pt-33 bg-black">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup className="space-y-4">
          <Pages pages={pages} />
          
          <SidebarSeparator />
          
          <PagesCreateDialog index={pages.length} projectId={pages[0].projectId}/>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
