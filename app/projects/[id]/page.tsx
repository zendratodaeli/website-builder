import ProjectFooter from "@/components/pages/project/project-footer";
import ProjectHeader from "@/components/pages/project/project-header";
import SectionList from "@/components/pages/project/section-list";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const ProjectPage = async ({ params }: Props) => {
  const { userId } = await auth();

  if (!userId) {
    notFound();
  }

  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id: +id,
      userId,
    },
    include: {
      sections: {
        orderBy: {
          index: "asc",
        },
        include: {
          text: true,
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="py-16">
      {/* <ProjectHeader /> */}
      <SectionList sections={project.sections} projectId={project.id} />
      {/* <ProjectFooter /> */}
    </div>
  );
};

export default ProjectPage;
