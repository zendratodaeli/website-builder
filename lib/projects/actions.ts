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

export type UpdateProjectPayload = Pick<Project, "id" | "title">;

export const updateProject = async ({
  id,
  title,
}: UpdateProjectPayload): Promise<ActionsStage<Project>> => {
  try {
    const project = await prisma.project.findUnique({
      where: { id }
    });

    if(!project) {
      return {
        code: StatusCode.NotFound,
        error: new Error(`NotFound, project with ${id}`)
      };
    };

    const updated = await prisma.project.update({
      where: {
        id
      },
      data: {
        title
      }
    })

    revalidatePath("/projects");

    return {
      code: StatusCode.Ok,
      data: updated,
      message: "Successfully updated project!"
    }

  } catch (error) {
    return {
      code: StatusCode.InternalServerError,
      error: new Error("Something went wrong wrong while updating")
    }
  }
}


type DeleteProjectPayload = Pick<Project, "id">

export const deleteProject = async ({
  id
}: DeleteProjectPayload): Promise<ActionsStage<Project>> => {
  try {
    const project = await prisma.project.findUnique({
      where: { id }
    });

    if(!project) {
      return {
        code: StatusCode.NotFound,
        error: new Error(`NotFound, project with ${id}`)
      };
    };

    const deleted = await prisma.project.delete({
      where: {
        id
      }
    })

    revalidatePath("/projects");

    return {
      code: StatusCode.Ok,
      data: deleted,
      message: "Successfully deleted project!"
    }

  } catch (error) {
    console.log(error)
    return {
      code: StatusCode.InternalServerError,
      error: new Error("Something went wrong wrong while deleting")
    }
  }
}

