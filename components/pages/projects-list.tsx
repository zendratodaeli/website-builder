import { Project } from "@/lib/generated/prisma";
import ProjectsItem from "./projects-item";

type Props = {
  projects: Project[];
};

const ProjectsList = ({ projects }: Props) => {
  return (
    <ul className="grid grid-cols-2 gap-8">
      {projects.map((project) => (
        <ProjectsItem key={project.id} project={project} />
      ))}
    </ul>
  );
};

export default ProjectsList;
