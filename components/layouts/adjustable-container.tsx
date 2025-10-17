"use client";

import React, { useState, useEffect } from "react";
import SectionList from "../features/project/sections/section-list";
import { ProjectWithAll } from "@/lib/project/types";
import { Project } from "@/lib/generated/prisma";
import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";

const widthOptions = [
  { label: "Width Full", value: "w-full" },
  { label: "2xl", value: "max-w-2xl" },
  { label: "3xl", value: "max-w-3xl" },
  { label: "4xl", value: "max-w-4xl" },
  { label: "5xl", value: "max-w-5xl" },
  { label: "6xl", value: "max-w-6xl" },
  { label: "7xl", value: "max-w-7xl" },
];

type Props = {
  sections: ProjectWithAll["sections"];
  projectId: Project["id"];
};

export default function AdjustableContainer({ sections, projectId }: Props) {
  const [selectedWidth, setSelectedWidth] = useState("max-w-7xl");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("selectedWidth");
    if (saved) setSelectedWidth(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedWidth", selectedWidth);
  }, [selectedWidth]);

  const selectedLabel =
    widthOptions.find((opt) => opt.value === selectedWidth)?.label || "7xl";

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Header with dropdown */}
      <div className="w-full flex flex-col items-center gap-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Adjust Content Width
        </h3>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[180px] justify-between"
            >
              {selectedLabel}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[180px] p-0">
            <Command>
              <CommandInput placeholder="Search width..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {widthOptions.map((opt) => (
                    <CommandItem
                      key={opt.value}
                      value={opt.value}
                      onSelect={() => {
                        setSelectedWidth(opt.value);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedWidth === opt.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {opt.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Main section content */}
      <div
        className={cn(
          selectedWidth,
          "w-full mx-auto transition-all duration-300"
        )}
      >
        <SectionList sections={sections} projectId={projectId} />
      </div>
    </div>
  );
}
