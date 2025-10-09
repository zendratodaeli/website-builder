"use server";

import { revalidatePath } from "next/cache";
import { $Enums, Prisma, Section, Video } from "../generated/prisma";
import { prisma } from "../prisma";
import { ActionsState, StatusCode } from "../types";

type CreateSectionPayload = Pick<Section, "index" | "type" | "projectId"> & {
  url?: Video["url"]
};

export const createSection = async ({
  index,
  type,
  projectId,
  url
}: CreateSectionPayload): Promise<ActionsState<Section>> => {
  try {
    const created = await prisma.$transaction(async () => {
      await prisma.section.updateManyAndReturn({
        where: {
          projectId,
          index: { gte: index },
        },
        data: { index: { increment: 1 } },
      });

      const isTextRequired =
        type === $Enums.SectionType.Text ||
        type === $Enums.SectionType.TextImage;
      const isImageRequired =
        type === $Enums.SectionType.Image ||
        type === $Enums.SectionType.TextImage;
      const isVideoRequired =
        type === $Enums.SectionType.Video && url;

      return prisma.section.create({
        data: {
          index,
          type,
          projectId,
          ...(isTextRequired && { text: { create: {} } }),
          ...(isImageRequired && { image: { create: {} } }),
          ...(isVideoRequired && { video: { create: { url } } }),
        },
      });
    });

    revalidatePath(`/projects/${projectId}`);

    return {
      code: StatusCode.Created,
      data: created,
      message: `Successfully created ${type} section`,
    };
  } catch (error) {
    console.error(error);

    return {
      code: StatusCode.InternalServerError,
      error: new Error(`Something went wrong while creating ${type} section`),
    };
  }
};

type DeleteSectionPayload = Pick<Section, "id">;

export const deleteSection = async ({
  id,
}: DeleteSectionPayload): Promise<ActionsState<Section>> => {
  try {
    const section = await prisma.section.findUnique({
      where: { id },
    });

    if (!section) {
      return {
        code: StatusCode.NotFound,
        error: new Error(`NotFound, section with ${id}`),
      };
    }

    const deleted = await prisma.$transaction(async () => {
      await prisma.section.updateManyAndReturn({
        where: {
          projectId: section.projectId,
          index: { gte: section.index },
        },
        data: { index: { decrement: 1 } },
      });

      return await prisma.section.delete({
        where: {
          id,
        },
      });
    });

    revalidatePath(`/projects/${section.projectId}`);

    return {
      code: StatusCode.Ok,
      data: deleted,
      message: "Successfully deleted section!",
    };
  } catch (error) {
    console.log(error);
    return {
      code: StatusCode.InternalServerError,
      error: new Error("Something went wrong wrong while deleting section"),
    };
  }
};

type UpdateSectionPayload = {
  id: Section["id"];
  data: Prisma.SectionUpdateInput;
};

export const updateSection = async ({ id, data }: UpdateSectionPayload) => {
  const updated = await prisma.section.update({
    where: {
      id,
    },
    data,
  });

  revalidatePath(`/projects/${updated.projectId}`);
};
