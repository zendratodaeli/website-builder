"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Ref } from "react";
import { Editor } from "@tiptap/react";
import { TEXT_COLORS } from "@/lib/text/constants";
import { TextColor } from "@/lib/text/types";

type Props = {
  portalRef: Ref<HTMLDivElement>;
  editor: Editor;
}

const TextSectionColorSelect = ({portalRef, editor}: Props) => {
  const currentColor = editor.getAttributes("textStyle").color || TEXT_COLORS[0];
  const changeTextColor = (color: TextColor) => {
    editor.chain().focus().setColor(color).run()
  };

  return (
     <Select 
      value={currentColor} 
      onValueChange={changeTextColor} 
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a color" />
      </SelectTrigger>
      <SelectContent ref={portalRef} className="dark min-w-none">
        <SelectGroup>
          {TEXT_COLORS.map((color) => (
            <SelectItem key={color} value={color}>
              <div
                style={{backgroundColor: color}}
                className="size-4 rounded-full border border-white"
              ></div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default TextSectionColorSelect
