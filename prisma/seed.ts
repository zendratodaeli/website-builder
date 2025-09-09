import { PrismaClient } from "@/lib/generated/prisma";

export const prisma = new PrismaClient();

async function run() {
  console.log("Seeding has started!");

  const project = await prisma.project.create({
    data: {
      title: "My First Project",
      userId: "1"
    }
  });

  console.log(JSON.stringify(project))

  console.log(`Successfully inserted projects data`)
};

run()
  .then(async() => {
    await prisma.$disconnect();
  })
  .catch(async(error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  })