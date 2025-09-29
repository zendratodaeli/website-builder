"use server";

import { revalidatePath } from "next/cache";
import { Section } from "../generated/prisma";
import { prisma } from "../prisma";
import { ActionsState, StatusCode } from "../types";

type CreateSectionPayload = Pick<Section, "index" | "type" | "projectId">;

export const createSection = async ({
  index,
  type,
  projectId,
}: CreateSectionPayload): Promise<ActionsState<Section>> => {

  try {
  const created = await prisma.$transaction(async () => {
    await prisma.section.updateManyAndReturn({
      where: {
        projectId, index: {gte: index}
      },
      data: { index: { increment: 1}}
    });
  
    return prisma.section.create({
      data: {
        index,
        type,
        projectId,
        text: {
          create: {}
        }
      },
    });
  })

  revalidatePath(`/projects/${projectId}`)

  return {code: StatusCode.Created, data: created, message: `Successfully created ${type} section`}

  
} catch (error) {
  console.error(error);

  return {
    code: StatusCode.InternalServerError,
    error: new Error(`Something went wrong while creating ${type} section`)
  }
}


};
