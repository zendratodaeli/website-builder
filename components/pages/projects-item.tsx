import { Card } from "../ui/card";
import Image from "next/image";
import projectPlaceholder from "@/public/project-placeholder.png";
import Form from "next/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const ProjectsItem = () => {
  return (
    <li className="space-y-4">
      <Card className="py-0">
        <Image src={projectPlaceholder} alt="placeholder image for project" />
      </Card>
      <Form action="/projects" className="relative">
        <Input id="project-title" className="peer" />
        <Label
          htmlFor="project-title"
          className="absolute left-2 top-2 text-gray-500 transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-background peer-focus:px-1"
        >
          Project Title
        </Label>
      </Form>
    </li>
  );
};

export default ProjectsItem;