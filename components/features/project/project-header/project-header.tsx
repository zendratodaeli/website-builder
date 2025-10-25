import Container from "@/components/core/container";
import { Page, Project } from "@/lib/generated/prisma";
import { DEFAULT_PAGES } from "@/lib/pages/constants";
import Link from "next/link";
import React from "react";
import ProjectHeaderMenu from "./project-header-menu";

type Props = {
  pages: Page[];
}

const ProjectHeader = ({pages}: Props) => {
  return (
  <header className="group">
    <ProjectHeaderMenu/>
    <Container>
      <nav>
        <ul className="flex items-center gap-4">
          {pages.map(({ href, label, projectId}) => (
            <li key={href}>
              <Link href={`/projects/${projectId}/${href}`}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      </Container>  
  </header>
  )
};

export default ProjectHeader;
