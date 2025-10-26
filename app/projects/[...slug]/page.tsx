import SectionList from "@/components/features/project/sections/section-list";
import { getPageWithAll } from "@/lib/pages";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const ProjectPage = async ({ params }: Props) => {
  const { slug } = await params;
  const [projectId, pageHref] = slug;
  const page = await getPageWithAll(+projectId, `/${pageHref || ""}`);

  if (!page) {
    notFound();
  }

  return (
    <div>
      {/* <AdjustableContainer sections={project.sections} projectId={project.id} /> */}
      <SectionList sections={page.sections} projectId={page.projectId} pageId={page.id} />
    </div>
  );
};

export default ProjectPage;
