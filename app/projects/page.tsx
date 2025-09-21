import Container from "@/components/core/container";
import ProjectsHeading from "@/components/pages/projects/projects-heading";
import ProjectsList from "@/components/pages/projects/projects-list";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const ProjectsPage = async () => {

  const { userId } = await auth()

  if(!userId) {
    redirect("/")
  }

  const projects = await prisma.project.findMany({
    where: {
      userId
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
