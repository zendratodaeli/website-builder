"use client";

import { Button } from "@/components/ui/button";
import { Project } from "@/lib/generated/prisma";
import { deleteProject } from "@/lib/projects/actions";
import { ActionsState } from "@/lib/types";
import { toast } from "sonner";

type Props<T> = {
  action: () => Promise<ActionsState<T>>
};

export default function DeleteForm<T>({ action }: Props<T>) {
  const formAction = async () => {
    const { data, error, message } = await action();

    if (data) {
      toast.success(message);
    }

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <form action={formAction}>
      <Button type="submit" variant="destructive">
        Confirm
      </Button>
    </form>
  );
};

