import MenuBar from "@/components/core/menubar";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Editor } from "@tiptap/react";

type Props = {
  editor: Editor;
};

const TextEditorMenubar = ({ editor }: Props) => {
  return (
    <MenuBar>
      <Button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
      >
        <AlignLeft />
      </Button>
      <Button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
      >
        <AlignCenter />
      </Button>
      <Button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
      >
        <AlignRight />
      </Button>

      <Button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={editor.isActive({ textAlign: "justify" }) ? "is-active" : ""}
      >
        <AlignJustify />
      </Button>
    </MenuBar>
  );
};

export default TextEditorMenubar;