import SectionList from "@/components/features/project/sections/section-list";
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
      <SectionList sections={project.sections} projectId={project.id} />
    </div>
  );
};

export default ProjectPage;
