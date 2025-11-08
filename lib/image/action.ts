"use server";

import { Image, Prisma } from "../generated/prisma";
import { ActionsState, StatusCode } from "../types";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

type UpdateImageUpload = {
  id: Image["id"];
  data: Prisma.ImageUpdateInput;
};

export const updateImage = async ({
  id,
  data,
}: UpdateImageUpload): Promise<ActionsState<Image>> => {
  try {
    const image = await prisma.image.findUnique({
      where: { id },
    });

    if (!image) {
      return {
        code: StatusCode.NotFound,
        error: new Error("Image not found, cannot update"),
      };
    }

    const updated = await prisma.image.update({
      where: {
        id,
      },
      data,
      include: {
        sectionItem: {
          include: {
            section: true,
          },
        },
      },
    });

    revalidatePath(`/projects/${updated.sectionItem.section.projectId}`);

    return {
      code: StatusCode.Ok,
      data: updated,
      message: "Successfully updated image",
    };
  } catch (error) {
    console.error(error);
    return {
      code: StatusCode.InternalServerError,
      error: new Error("Something went wrong while updating the image"),
    };
  }
};
