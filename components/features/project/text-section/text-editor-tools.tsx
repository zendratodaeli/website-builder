import { Editor } from "@tiptap/react";
import { Pencil } from "lucide-react";
import MenuBar, { MenuBarItem } from "@/components/core/menubar";
import TextAlignButtons from "./text-align-buttons";
import { Ref } from "react";

type Props = {
  ref: Ref<HTMLDivElement>;
  editor: Editor;
  isEditable: boolean;
  onEditButtonClick: () => void;
};

const TextEditorTools = ({
  ref,
  editor,
  isEditable,
  onEditButtonClick,
}: Props) => {
  return (
    <MenuBar className="absolute -top-13 left-0" ref={ref}>
      {!isEditable && (
        <MenuBarItem onClick={onEditButtonClick}>
          <Pencil />
        </MenuBarItem>
      )}

      {isEditable && (
      <TextAlignButtons editor={editor}/>
        
      )}
    </MenuBar>
  );
};

export default TextEditorTools;
