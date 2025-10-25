  "use server"

import { revalidatePath } from "next/cache"
import { Page } from "../generated/prisma"
import { prisma } from "../prisma"

  export const reorderPages = async (newOrder: Page[]) => {
    const updated = await Promise.all(newOrder.map(({id}, index) =>
      prisma.page.update({
        where: {
          id
        },
        data: {
          index
        }
      })
    ))

    revalidatePath(`/projects/${updated[0].projectId}`)
  }