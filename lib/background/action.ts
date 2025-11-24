"use server";

import { revalidatePath } from "next/cache";
import { Prisma, SectionBackground } from "../generated/prisma";
import { prisma } from "../prisma";
import { ActionsState, StatusCode } from "../types";

type CreateBackgroundPayload = {
  data: Prisma.SectionBackgroundCreateInput;
};

export const createBackground = async ({
  data,
}: CreateBackgroundPayload): Promise<ActionsState<SectionBackground>> => {
  try {
    const created = await prisma.sectionBackground.create({
      data,
      include: { section: true },
    });

    revalidatePath(`/projects/${created.section.projectId}`);

    return {
      code: StatusCode.Ok,
      data: created,
      message: "Background created successfully",
    };
  } catch (error) {
    console.error("Error deleting background:", error);
    return {
      code: StatusCode.InternalServerError,
      error: new Error("Something went wrong while creating the background"),
    };
  }
};

export const deleteBackground = async (
  id: SectionBackground["id"]
): Promise<ActionsState<SectionBackground>> => {
  try {
    const background = await prisma.sectionBackground.findUnique({
      where: { id },
    });

    if (!background) {
      return {
        code: StatusCode.NotFound,
        error: new Error("Background not found"),
      };
    }

    const deleted = await prisma.sectionBackground.delete({
      where: { id },
      include: { section: true },
    });

    revalidatePath(`/projects/${deleted.section.projectId}`);

    return {
      code: StatusCode.Ok,
      data: deleted,
      message: "Background deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting background:", error);
    return {
      code: StatusCode.InternalServerError,
      error: new Error("Something went wrong while deleting the background"),
    };
  }
};
