"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useDebounce from "@/hook/use-debounce";
import { Project } from "@/lib/generated/prisma";
import { updateProject, UpdateProjectPayload } from "@/lib/projects/actions";
import Form from "next/form";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  title: Project["title"];
  id: Project["id"]
};

const ProjectsUpdateForm = ({id, title }: Props) => {
  const [value, setValue] = useState<string>(title);

  const debounced = useDebounce(value, 700);

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const updateProjectCallback = useCallback(
    async ({id, title}: UpdateProjectPayload) => {
      const {data, error, message} = await updateProject({id, title});

      if(data) {
        toast.success(message);
      };

      if(error) {
        toast.error(error.message);
      }
    },
    []
  );

  useEffect(() => {
    if(title !== debounced) {
      updateProjectCallback({id, title: debounced});

    }
  }, [debounced, id, title, updateProjectCallback]);

  return (
    <div>
      <Form action="/projects" className="relative">
        <Label htmlFor="project-title" className=" text-muted-foreground">Project Title</Label>
        <Input
          id="project-title"
          className="peer"
          defaultValue={value}
          onChange={handleValueChange}
        />
      </Form>
    </div>
  );
};

export default ProjectsUpdateForm;
