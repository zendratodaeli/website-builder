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
import { SectionBackground } from '@/lib/generated/prisma';

type Props = {
  onAddBackground: (
    url: SectionBackground["url"], 
    alt?: SectionBackground["alt"]
  ) => void;
}

const BackgroundAddDialog = ({onAddBackground}: Props) => {
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

          <ImageForm onSubmit={onAddBackground} />
        </DialogContent>
      </Dialog>
  )
}

export default BackgroundAddDialog
