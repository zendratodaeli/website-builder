import { Card } from "../../ui/card";
import Image from "next/image";
import projectPlaceholder from "@/public/project-placeholder.png";
import { Project } from "@/lib/generated/prisma";
import ProjectsUpdateForm from "./projects-update-form";
import ProjectsDropdown from "./projects-dropdown";
import Link from "next/link";

type Props = {
  project: Project;
};

const ProjectsItem = ({ project: { id, title } }: Props) => {
  return (
    <li className="space-y-4 relative">
      <ProjectsDropdown id={id}/>
      <Link href={`/projects/${id}`} className="cursor-pointer">
      <Card className="py-0">
        <Image src={projectPlaceholder} alt="placeholder image for project" />
      </Card>
      </Link>
      <ProjectsUpdateForm id={id} title={title} />
    </li>
  );
};

export default ProjectsItem;