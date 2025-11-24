"use server";

import { revalidatePath } from "next/cache";
import { Prisma, Text } from "../generated/prisma";
import { prisma } from "../prisma";
import { ActionsState, StatusCode } from "../types";

type UpdateTextPayload = {
  id: Text["id"];
  data: Pick<Prisma.TextUpdateInput, "content" | "rowPosition">;
};

export const updateText = async ({
  id,
  data,
}: UpdateTextPayload): Promise<ActionsState<Text>> => {
  try {
    const text = await prisma.text.findUnique({
      where: {
        id,
      },
    });

    if (!text) {
      return {
        code: StatusCode.NotFound,
        error: new Error(`Not found text with id ${id}`),
      };
    }

    const updated = await prisma.text.update({
      where: {
        id,
      },
      data,
      include: {
        sectionItem: {
          include: {
            section: {
              select: {
                projectId: true,
              },
            },
          }
        }
      },
    });

    revalidatePath(`/projects/${updated.sectionItem.section.projectId}`);

    return {
      code: StatusCode.Ok,
      data: updated,
      message: "Successfully updated text content!",
    };
  } catch (error) {
    console.error(error);
    return {
      code: StatusCode.InternalServerError,
      error: new Error(`Something went wrong  while updatin text content!`),
    };
  }
};
