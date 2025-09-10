"use server";

import { revalidatePath } from "next/cache";
import { Project } from "../generated/prisma";
import { prisma } from "../prisma";
import { ActionsStage, StatusCode } from "./types";

type CreateProjectPayload = {
title: Project["title"];
}

export const createProject = async ({
  title,
}: CreateProjectPayload): Promise<ActionsStage<Project>> => {
  try {
    const project = await prisma.project.create({
      data: {
        title,
        userId: "1",
      },
    });

    revalidatePath("/projects");
    return {
      code: StatusCode.Created,
      data: project,
      message: "Successfully created a new project",
    };
  } catch (err) {
    console.error(err);
    return {
      code: StatusCode.InternalServerError,
      error: new Error("Something went wrong while creating a project!"),
    };
  }
};