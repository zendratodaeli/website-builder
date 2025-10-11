import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

async function run() {
  console.log("Seeding has started!");

  const project = await prisma.project.create({
    data: {
      title: "My First Project",
      userId: "user_331U8WOs3xWJPi81cJOy926vrv2",
      sections: {
        create: [
          {
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
        ],
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
    },
  });

  const section = await prisma.section.create({
    data: {
      index: 3,
      type: "TextImage",
      projectId: project.id,
    },
  });

  await Promise.all([
    prisma.sectionItem.create({
      data: {
        sectionId: section.id,
        type: "Text",
        index: 0,
        text: {
          create: {}
        }
      }
    }),
    prisma.sectionItem.create({
      data: {
        sectionId: section.id,
        type: "Image",
        index: 1,
        image: {
          create: {}
        }
      }
    }) 
  ])

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
