import { MenuBarItem } from "@/components/core/menubar";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import { Editor } from "@tiptap/react";

type Props = {
  editor: Editor;
};

const ALIGNMENTS = [
  {
    label: "left",
    icon: <AlignLeft/>
  },
  {
    label: "center",
    icon: <AlignCenter/>
  },
  {
    label: "right",
    icon: <AlignRight/>
  },
  {
    label: "justify",
    icon: <AlignJustify/>
  },
]

const TextAlignButtons = ({ editor }: Props) => {
  return (
    <>

    {ALIGNMENTS.map(({label, icon}, index) => (
      <MenuBarItem
        onClick={() => editor.chain().focus().setTextAlign(label).run()}
        className={editor.isActive({ textAlign: label }) ? "is-active" : ""}
        key={label + index}
      >
        {icon}
      </MenuBarItem>
    ))}
    </>
  );
};

export default TextAlignButtons;