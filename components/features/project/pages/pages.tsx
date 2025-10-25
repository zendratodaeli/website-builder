import { SortableItem, SortableList } from "@/components/core/sortable";
import { Button } from "@/components/ui/button";
import { Page } from "@/lib/generated/prisma";
import { reorderPages } from "@/lib/pages/action";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { startTransition, useOptimistic } from "react";

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
            // change id of the project id dynamically
              href={`/projects/${projectId}/${href}`}
              className="line-clamp-1">
              {label}
            </Link>
            <div className="flex gap-2">
              <Button variant={"outline"} size={"icon"}>
                <Pencil/>
              </Button>
              <Button variant={"outline"} size={"icon"}>
                <Trash2 className="text-destructive"/>
              </Button>
            </div>
          </div>
        </SortableItem>
      ))}
    </SortableList>
  );
};

export default Pages;
