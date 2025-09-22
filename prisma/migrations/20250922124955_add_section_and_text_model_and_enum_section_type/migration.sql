/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `projects` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "public"."SectionType" AS ENUM ('Text', 'Image', 'TextImage');

-- CreateTable
CREATE TABLE "public"."sections" (
    "id" SERIAL NOT NULL,
    "type" "public"."SectionType" NOT NULL,
    "index" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."texts" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL DEFAULT '<h1>This is your heading</h1><p>You can write here as much as you want!</p>',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "section_id" INTEGER NOT NULL,

    CONSTRAINT "texts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "sections_project_id_index_idx" ON "public"."sections"("project_id", "index" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "texts_section_id_key" ON "public"."texts"("section_id");

-- CreateIndex
CREATE UNIQUE INDEX "projects_title_key" ON "public"."projects"("title");

-- AddForeignKey
ALTER TABLE "public"."sections" ADD CONSTRAINT "sections_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."texts" ADD CONSTRAINT "texts_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "public"."sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
