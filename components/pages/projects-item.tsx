import { Card } from "../ui/card";
import Image from "next/image";
import projectPlaceholder from "@/public/project-placeholder.png";
import Form from "next/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Project } from "@/lib/generated/prisma";

type Props = {
  project: Project;
}

const ProjectsItem = ({project: { title }}: Props) => {
  return (
    <li className="space-y-4">
      <Card className="py-0">
        <Image src={projectPlaceholder} alt="placeholder image for project" />
      </Card>
      <Form action="/projects" className="relative">
        <Label
          htmlFor="project-title"
        >
          Project Title
        </Label>
        <Input id="project-title" className="peer" defaultValue={title} />
      </Form>
    </li>
  );
};

export default ProjectsItem;