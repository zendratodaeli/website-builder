"use server";

import { revalidatePath } from "next/cache";
import { Prisma, Video } from "../generated/prisma";
import { prisma } from "../prisma";
import { ActionsState, StatusCode } from "../types";

type UpdateVideoPayload = {
  id: Video["id"];
  data: Prisma.VideoUpdateInput;
};

export const updateVideo = async ({
  id,
  data,
}: UpdateVideoPayload): Promise<ActionsState<Video>> => {
  const updated = await prisma.video.update({
    where: {
      id,
    },
    data,
    include: {
      sectionItem: {
        include: {
          section: true,
        }
      }
    },
  });

  revalidatePath(`/projects/${updated.sectionItem.section.projectId}`);

  return {
    code: StatusCode.Ok,
    data: updated,
    message: "Successfully updated the video",
  };
};
