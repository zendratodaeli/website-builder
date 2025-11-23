import { MenuBarItem } from '@/components/core/menubar'
import { ImageIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from 'react';
import { ImageForm } from '../image-section/image-form';

type Props = {
  onBackgroundAdd: (url: string) => void;
}

const BackgroundAddDialog = ({onBackgroundAdd}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <MenuBarItem>
                <ImageIcon />
              </MenuBarItem>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Background Image</DialogTitle>
          </DialogHeader>

          <ImageForm onSubmit={(url) => onBackgroundAdd(url)} />
        </DialogContent>
      </Dialog>
  )
}

export default BackgroundAddDialog
