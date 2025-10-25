import { auth } from "@clerk/nextjs/server";
import { Page } from "../generated/prisma";
import { prisma } from "../prisma";

export const getPageWithAll = async (
  projectId: Page["projectId"],
  href: Page["href"]
) => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  return await prisma.page.findUnique({
    where: {
      href_projectId: {projectId, href}
    },
    include: {
      sections: {
        orderBy: {
          index: "asc",
        },
        include: {
          items: {
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
              video: true,
            },
          },
        },
      },
    },
  });
};
