"use server";

import z, { treeifyError } from "zod";
import { Image } from "../generated/prisma";
import { ActionsState, StatusCode } from "../types";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

const updateImageSchema = z.object({
  url: z.string().nonempty({ message: "This field is required" }),
  alt: z.string().optional(),
});

export const updateImage = async (
  id: Image["id"],
  state: ActionsState<Image>,
  formData: FormData
): Promise<ActionsState<Image>> => {
  const validation = updateImageSchema.safeParse({
    url: formData.get("url"),
    alt: formData.get("alt"),
  });

  if (!validation.success) {
    const tree = treeifyError(validation.error);

    // ✅ new correct structure
    const firstError =
      tree.properties?.url?.errors?.[0] ||
      tree.properties?.alt?.errors?.[0] ||
      tree.errors?.[0] ||
      "Invalid input";

    return {
      code: StatusCode.BadRequest,
      error: new Error(firstError),
    };
  }

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
      data: {
        url: validation.data.url,
        alt: validation.data.alt,
      },
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
