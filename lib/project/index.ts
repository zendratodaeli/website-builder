import { auth } from "@clerk/nextjs/server";
import { Project } from "../generated/prisma";
import { prisma } from "../prisma";

export const getProjectWithAll = async (id: Project["id"]) => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  return await prisma.project.findUnique({
    where: {
      id,
      userId,
    },
    include: {
      sections: {
        orderBy: {
          index: "asc",
        },
        include: {
          text: {
            include: {
              externalLink: true,
            },
          },
          image: true,
        },
      },
    },
  });
};
