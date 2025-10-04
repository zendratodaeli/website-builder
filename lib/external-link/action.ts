"use server";

import { revalidatePath } from "next/cache";
import { ExternalLink, Text } from "../generated/prisma";
import { prisma } from "../prisma";
import { ActionsState, StatusCode } from "../types";

export const createExternalLink = async (
  textId: Text["id"]
): Promise<ActionsState<ExternalLink>> => {
  try {
    const created = await prisma.externalLink.create({
      data: {
        textId,
      },
      include: {
        text: {
          include: {
            section: {
              select: { projectId: true },
            },
          },
        },
      },
    });

    revalidatePath(`/projects/${created.text.section.projectId}`);

    return {
      code: StatusCode.Created,
      data: created,
      message: "Successfully created external link",
    };
  } catch (error) {
    console.error(error);
    return {
      code: StatusCode.InternalServerError,
      error: new Error("Something went wrong while creating external link"),
    };
  }
};

export const updateExternalLink = async (
  id: ExternalLink["id"],
  state: ActionsState<ExternalLink>,
  formData: FormData
): Promise<ActionsState<ExternalLink>> => {
  try {
    const externalLink = await prisma.externalLink.findUnique({
      where: {
        id,
      },
    });

    if (!externalLink) {
      return {
        code: StatusCode.NotFound,
        error: new Error("Not found, cannot update recored"),
      };
    }

    const url = formData.get("url") as string;
    const label = formData.get("label") as string;

    const updated = await prisma.externalLink.update({
      where: {
        id,
      },
      data: {
        label,
        url,
      },
      include: {
        text: {
          include: {
            section: {
              select: { projectId: true },
            },
          },
        },
      },
    });

    revalidatePath(`/projects/${updated.text.section.projectId}`);

    return {
      code: StatusCode.Ok,
      data: updated,
      message: "Successfully updated external link",
    };
  } catch (error) {
    console.error(error);
    return {
      code: StatusCode.InternalServerError,
      error: new Error("Something went wrong while updating external link"),
    };
  }
};

export const deleteExternalLink = async (
  id: ExternalLink["id"]
): Promise<ActionsState<ExternalLink>> => {
  try {
    const externalLink = await prisma.externalLink.findUnique({
      where: {
        id,
      },
    });

    if (!externalLink) {
      return {
        code: StatusCode.NotFound,
        error: new Error("Not found, cannot delete recored"),
      };
    }

    const deleted = await prisma.externalLink.delete({
      where: {
        id,
      },
      include: {
        text: {
          include: {
            section: {
              select: { projectId: true },
            },
          },
        },
      },
    });

    revalidatePath(`/projects/${deleted.text.section.projectId}`);

    return {
      code: StatusCode.Ok,
      data: deleted,
      message: "Successfully deleted external link",
    };
  } catch (error) {
    console.error(error);
    return {
      code: StatusCode.InternalServerError,
      error: new Error("Something went wrong while deleting external link"),
    };
  }
};
