"use client";

import { Button } from "@/components/ui/button";
import { Project } from "@/lib/generated/prisma";
import { deleteProject } from "@/lib/projects/actions";
import { toast } from "sonner";

type Props = {
  id: Project["id"];
};

const ProjectsDeleteForm = ({ id }: Props) => {
  const handleSubmit = async () => {
    const { data, error, message } = await deleteProject({ id });

    if (data) {
      toast.success(message);
    }

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <form action={handleSubmit}>
      <Button type="submit" variant="destructive">
        Confirm
      </Button>
    </form>
  );
};

export default ProjectsDeleteForm;
