import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { LetterText, Plus } from 'lucide-react'
import React from 'react'

const SectionButton = () => {
  return (
    <div className='border-t relative hover:border-primary'>
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"icon"} className='absolute top-0 left-1/2 -translate-y-1/2'> <Plus/> </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a section to your website</DialogTitle>
          </DialogHeader>

          <ul className='py-16 grid grid-cols-4 gap-4'>
            <li className='flex justify-center items-center'>
              <Button variant={"plain"} size={"none"} className='group flex flex-col items-center gap-2'>
                <div className='group-hover:bg-accent p-4'>
                  <LetterText className='size-10 group-hover:bg-accent'/>
                </div>
                <span className='text-muted-foreground hover:text-foreground text-xs'>Video & Image</span>
              </Button>
            </li>
          </ul>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"outline"}>Close</Button>
              </DialogClose>
            </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
  )
}

export default SectionButton
