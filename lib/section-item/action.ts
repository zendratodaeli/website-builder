"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "../prisma"
import { SectionItemWithAll } from "../project/types"
import { ActionsState, StatusCode } from "../types"
import { Image, SectionItem, SectionItemType } from "../generated/prisma"

export const createSectionItem = async (
  sectionId: SectionItem["sectionId"],
  url?: Image["url"],
  alt?: Image["alt"],
): Promise<ActionsState<SectionItemWithAll>> => {
  const created = await prisma.$transaction(async () => {
    await prisma.sectionItem.updateMany({
      where: {sectionId},
      data: {
        index: {
          increment: 1
        }
      }
    });

    return prisma.sectionItem.create({
      data: {
        index: 0,
        type: SectionItemType.Image,
        sectionId,
        image: { create: {url, alt}}
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
    });
  });

  const projectId = created.section.projectId;

  revalidatePath(`/projects/${projectId}`);

  return {
    code: StatusCode.Created,
    data: created,
    message: "Successfully created section item"
  }
}

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
};

export const deleteSectionItem = async (
  id: SectionItem["id"],
): Promise<ActionsState<SectionItem>> => {
  const deleted = await prisma.$transaction(async () => {

    const sectionItemDeleted = await prisma.sectionItem.delete({
      where: {
        id
      },
      include: {
        section: true,
      }
    });

    await prisma.sectionItem.updateMany({
      where: {sectionId: sectionItemDeleted.sectionId},
      data: {
        index: {
          decrement: 1
        }
      }
    });
    return sectionItemDeleted;
  });

  const projectId = deleted.section.projectId;

  revalidatePath(`/projects/${projectId}`);

  return {
    code: StatusCode.Ok,
    data: deleted,
    message: "Successfully deleted section item"
  }
}