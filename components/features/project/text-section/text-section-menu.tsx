import { Editor } from "@tiptap/react";
import { Pencil } from "lucide-react";
import MenuBar, { MenuBarItem } from "@/components/core/menubar";
import TextSectionAlignButtons from "./text-section-align-buttons";
import { Ref } from "react";
import TextSectionColorSelect from "./text-section-color-select";

type Props = {
  menuRef: Ref<HTMLDivElement>;
  portalRef: Ref<HTMLDivElement>;
  editor: Editor;
  isEditable: boolean;
  onEditButtonClick: () => void;
};

const TextSectionMenu = ({
  menuRef,
  portalRef,
  editor,
  isEditable,
  onEditButtonClick,
}: Props) => {
  return (
    <MenuBar className="absolute -top-13 left-0" ref={menuRef}>
      {!isEditable && (
        <MenuBarItem onClick={onEditButtonClick}>
          <Pencil />
        </MenuBarItem>
      )}

      {isEditable && (
        <>
          <TextSectionColorSelect editor={editor} portalRef={portalRef} />
          <TextSectionAlignButtons editor={editor}/>
        </>
        
      )}
    </MenuBar>
  );
};

export default TextSectionMenu;
