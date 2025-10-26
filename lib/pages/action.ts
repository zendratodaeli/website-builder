"use server";

import { revalidatePath } from "next/cache";
import { Page, Prisma } from "../generated/prisma";
import { prisma } from "../prisma";
import { ActionsState, StatusCode } from "../types";

type CreatePagePayload = {
  data: Prisma.PageCreateInput;
}

export const createPage = async ({data}: CreatePagePayload ) => {
  const created = await prisma.page.create({
    data
  });

  revalidatePath(`/projects/${created.projectId}`)
}

export const reorderPages = async (newOrder: Page[]) => {
  const updated = await Promise.all(
    newOrder.map(({ id }, index) =>
      prisma.page.update({
        where: {
          id,
        },
        data: {
          index,
        },
      })
    )
  );

  revalidatePath(`/projects/${updated[0].projectId}`);
};

type deletePagePayload = {
  id: Page["id"]
}

export const deletePage = async ({id}: deletePagePayload ): Promise<ActionsState<Page>> => {
  const deleted = await prisma.page.delete({
    where: {
      id
    }
  });
  revalidatePath(`/projects/${deleted.projectId}`);

  // if user is on the deleted page, redirect user to the home page;

  return {
    code: StatusCode.Ok,
    data: deleted,
    message: "Successfully deleted page"
  }
};

type UpdatePagePayload = {
  id: Page["id"];
  data: Prisma.PageUpdateInput;
}

export const updatePage = async ({id, data}: UpdatePagePayload) => {
  const updated = await prisma.page.update({
    where: {
      id
    },
    data
  });

  revalidatePath(`/projects/${updated.projectId}`);
}