import Container from "@/components/core/container";
import ProjectsHeading from "@/components/pages/projects/projects-heading";
import ProjectsList from "@/components/pages/projects/projects-list";
import { prisma } from "@/lib/prisma";
import React from "react";

const ProjectsPage = async () => {

  const projects = await prisma.project.findMany({
    where: {
      userId: "1"
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return (
    <Container className="space-y-16">
      <ProjectsHeading/>
      <ProjectsList projects={projects}/>
    </Container>
  );
};

export default ProjectsPage;
