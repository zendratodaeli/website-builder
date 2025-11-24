import { PrismaClient } from "@/lib/generated/prisma";
import { DEFAULT_PAGES } from "@/lib/pages/constants";

const prisma = new PrismaClient();

async function run() {
  console.log("Seeding has started!");

  const project = await prisma.project.create({
    data: {
      title: "My First Project",
      userId: "user_331U8WOs3xWJPi81cJOy926vrv2",
      pages: {
        createMany: {
          data: DEFAULT_PAGES.map(({ href, label }, index) => ({
            href,
            label,
            index,
          })),
        },
      },
    },
    include: {
      pages: {
        orderBy: {
          index: "asc",
        },
      },
    },
  });

  await prisma.section.create({
    data: {
      projectId: project.id,
      pageId: project.pages[1].id,
      type: "Text",
      index: 0,
      background: { 
        create: {
          url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        } 
      },
      items: {
        create: {
          type: "Text",
          index: 0,
          text: {
            create: {},
          },
        },
      },
    },
  });

  await prisma.section.create({
    data: {
      projectId: project.id,
      pageId: project.pages[0].id,
      type: "Text",
      index: 0,
      items: {
        create: {
          type: "Text",
          index: 0,
          text: {
            create: {},
          },
        },
      },
    },
  });

  await prisma.section.create({
    data: {
      index: 1,
      type: "Image",
      items: {
        create: {
          type: "Image",
          index: 0,
          image: {
            create: {},
          },
        },
      },
    projectId: project.id,
    pageId: project.pages[0].id,
    },
  });

  await prisma.section.create({
    data: {
      index: 2,
      type: "Video",
      items: {
        create: {
          type: "Video",
          index: 0,
          video: {
            create: {
              url: "https://www.youtube.com/embed/5XHExpV6ons?list=PLGftZK6W8sO43qLc4hiWRM-JQehhNbxUW",
            },
          },
        },
      },
      projectId: project.id,
      pageId: project.pages[0].id,
    },
  });

  const section = await prisma.section.create({
    data: {
      index: 3,
      type: "TextImage",
      projectId: project.id,
      pageId: project.pages[0].id,
    },
  });

  await Promise.all([
    prisma.sectionItem.create({
      data: {
        sectionId: section.id,
        type: "Text",
        index: 0,
        text: {
          create: {},
        },
      },
    }),
    prisma.sectionItem.create({
      data: {
        sectionId: section.id,
        type: "Image",
        index: 1,
        image: {
          create: {},
        },
      },
    }),
  ]);

  console.log(`Successfully inserted projects data`);
}

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
