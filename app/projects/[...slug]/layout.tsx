import ProjectHeader from "@/components/features/project/project-header/project-header";
import { ProjectSidebar } from "@/components/layouts/project-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: Promise<{ slug: string[] }>;
};

const Layout = async ({ children, params }: Props) => {
  const { slug } = await params;
  const [projectId] = slug;

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  const { userId } =  await auth();

  if(!userId) {
    notFound();
  }

  const project = await prisma.project.findUnique({
    where: {
      id: +projectId,
      userId
    },
    include: {
      pages: {
        orderBy: {
          index: "asc"
        }
      }
    }
  })

  if(!project) {
    notFound();
  };

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <ProjectSidebar pages={project?.pages} />
      <div className="flex-1">
        <ProjectHeader pages={project?.pages} />
        {children}
      </div>
    </SidebarProvider>
  );
};

export default Layout;
