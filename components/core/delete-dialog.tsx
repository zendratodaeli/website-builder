import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { Project } from "@/lib/generated/prisma";
import DeleteForm from "./delete-form";
import { ActionsState } from "@/lib/types";

type Props<T> = {
  children: ReactNode;
  action: () => Promise<ActionsState<T>>;
};

export default function DeleteDialog<T>({ action, children }: Props<T>) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutey sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanantly delete it from database!
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DeleteForm action={action} />
          <DialogClose asChild>
            <Button variant={"outline"}>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
