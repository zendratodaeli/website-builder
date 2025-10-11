"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "../prisma"
import { SectionItemWithAll } from "../project/types"
import { ActionsState, StatusCode } from "../types"

export const reorderSectionItems = async (
  items: SectionItemWithAll[]
): Promise<ActionsState<SectionItemWithAll[]>> => {
  
  const itemsToUpdate = items.map(({id}, index) =>
    prisma.sectionItem.update({
      where: {
        id
      },
      data: {
        index
      },
      include: {
        section: true,
        image: true,
        video: true,
        text: {
          include: {
            externalLink: true
          }
        }
      }
    })    
  )

  const updated = await Promise.all(itemsToUpdate);
  const projectId = updated[0].section.projectId;

  revalidatePath(`/projects/${projectId}`);

  return {
    code: StatusCode.Ok,
    data: updated,
    message: "Successfully reordered section items"
  }

}