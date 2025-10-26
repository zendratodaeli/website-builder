"use client"

import DeleteDialog from "@/components/core/delete-dialog";
import { SortableItem, SortableList } from "@/components/core/sortable";
import { Button } from "@/components/ui/button";
import { Page } from "@/lib/generated/prisma";
import { deletePage, reorderPages } from "@/lib/pages/action";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { startTransition, useOptimistic } from "react";
import PagesEditDialog from "./pages-edit-dialog";

type Props = {
  pages: Page[];
}

const Pages = ({pages}: Props) => {
  const [optimisticItems, action] = useOptimistic<Page[], Page[]>(pages, (state, action) => action)

  const reorder = (newOder: Page[]) => {
    startTransition(() => {
      action(newOder);
      reorderPages(newOder);
    })
  }

  return (
    <SortableList items={optimisticItems} onReorder={reorder}>
      {optimisticItems.map(({ id, label, href, projectId }) => (
        <SortableItem key={id} id={id} className="flex gap-2 p-4 hover:bg-accent" activatorClassname="cursor-grab">
          <div className="flex gap-2 items-center justify-between">
            <Link
              className="line-clamp-1"
              href={`/projects/${projectId}/${href}`}
            >
              {label}
            </Link>
            <div className="flex gap-2">
              <PagesEditDialog id={id} label={label} href={href}/>
              <DeleteDialog action={deletePage.bind(null, { id })}>
                <Button variant={"outline"} size={"icon"}>
                  <Trash2 className="text-destructive"/>
                </Button>
              </DeleteDialog>
            </div>
          </div>
        </SortableItem>
      ))}
    </SortableList>
  );
};

export default Pages;
