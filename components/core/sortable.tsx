"use client"

import { ReactNode } from "react";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Arguments } from "@dnd-kit/sortable/dist/hooks/useSortable";

import {
  DndContext,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";

import React from "react";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

type SortableListProps<T> = {
  children: ReactNode;
  items: T[];
  className?: string;
  onReorder?: (newOrder: T[]) => void;
};

export const SortableList = <T extends { id: UniqueIdentifier }>({
  children,
  items,
  className,
  onReorder,
}: SortableListProps<T>) => {
  const handleDragEnd = function handleDragEnd({ active, over }: DragEndEvent) {
    if (active.id !== over?.id && onReorder) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over?.id);
      const newOrder = arrayMove(items, oldIndex, newIndex);
      onReorder(newOrder);
    }
  };
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <ul className={className}>{children}</ul>
      </SortableContext>
    </DndContext>
  );
};

type SortableItemProps = {
  children: ReactNode;
  className?: string;
  activatorClassname?: string;
} & Arguments;

export function SortableItem({ children, className, activatorClassname,...rest }: SortableItemProps) {
  const { isDragging, attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition } =
    useSortable({ ...rest });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li 
    className={className}
      ref={setNodeRef} 
      style={style} 
      {...attributes}
    suppressHydrationWarning
    >
      <button 
        ref={setActivatorNodeRef} 
        {...listeners}
        className={activatorClassname}
      >
        <GripVertical/>
      </button>
      <div className={cn(isDragging && "rotate-2 scale-105", "flex-1")}>
        {children}
      </div>

    </li>
  );
}
