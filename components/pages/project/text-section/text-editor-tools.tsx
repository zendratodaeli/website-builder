import { Editor } from "@tiptap/react";
import { Pencil } from "lucide-react";
import MenuBar, { MenuBarItem } from "@/components/core/menubar";
import TextAlignButtons from "./text-align-buttons";

type Props = {
  editor: Editor;
  isEditable: boolean;
  onEditButtonClick: () => void;
};

const TextEditorTools = ({
  editor,
  isEditable,
  onEditButtonClick,
}: Props) => {
  return (
    <MenuBar className="absolute -top-13 left-0">
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
