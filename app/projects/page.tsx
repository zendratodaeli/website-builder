import Container from "@/components/core/container";
import ProjectsHeading from "@/components/pages/projects-heading";
import ProjectsList from "@/components/pages/projects-list";
import React from "react";

const ProjectsPage = () => {
  return (
    <Container className="space-y-16">
      <ProjectsHeading/>
      <ProjectsList/>
    </Container>
  );
};

export default ProjectsPage;
