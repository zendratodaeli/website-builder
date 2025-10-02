import { Button } from "@/components/ui/button";
import { Editor } from "@tiptap/react";
import TextEditorMenubar from "./text-editor-menubar";
import { Pencil } from "lucide-react";

type Props = {
  editor: Editor;
  isEditButtonShown: boolean;
  isEditable: boolean;
  onEditButtonClick: () => void;
};

const TextEditorTools = ({
  editor,
  isEditable,
  isEditButtonShown,
  onEditButtonClick,
}: Props) => {
  return (
    <div className="absolute -top-12 left-0">
      {isEditButtonShown && !isEditable && (
        <Button onClick={onEditButtonClick}>
          <Pencil />
        </Button>
      )}

      {isEditable && isEditButtonShown && (
      <TextEditorMenubar editor={editor}/>
        
      )}
    </div>
  );
};

export default TextEditorTools;
