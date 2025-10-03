"use server"

import { Prisma, Text } from "../generated/prisma"
import { prisma } from "../prisma"
import { ActionsState, StatusCode } from "../types";

type UpdateTextPayload = {
  id: Text["id"],
  data: Pick<Prisma.TextUpdateInput, "content">;
}

export const updateText = async ({id, data}:UpdateTextPayload): Promise<ActionsState<Text>> => {
  const updated = await prisma.text.update({
    where: {
      id
    },
    data
  });

  return {
    code: StatusCode.Ok,
    data: updated,
    message: "Successfully updated text content!"
  }
}