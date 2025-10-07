import SectionList from "@/components/pages/project/sections/section-list";
import { getProjectWithAll } from "@/lib/project";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};


const ProjectPage = async ({ params }: Props) => {
  const { id } = await params;

  const project = await getProjectWithAll(+id);

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
