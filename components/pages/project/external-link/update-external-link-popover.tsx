import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ExternalLink } from "@/lib/generated/prisma"
import React, { ReactNode } from 'react'
import UpdateExternalLinkForm from "./update-external-link-form";

type Props = {
  children: ReactNode;
  externalLink: ExternalLink
}

const UpdateExternalLinkPopover = ({children, externalLink}: Props) => {
  return (
     <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80" onClick={(event) => event.stopPropagation()}>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Update External Link</h4>
            <p className="text-muted-foreground text-sm">
              Set the label and url for your external link.
            </p>
          </div>
          <UpdateExternalLinkForm externalLink={externalLink} />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default UpdateExternalLinkPopover
