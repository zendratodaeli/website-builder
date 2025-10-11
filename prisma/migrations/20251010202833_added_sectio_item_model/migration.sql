/*
  Warnings:

  - You are about to drop the column `section_id` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `is_reversed` on the `sections` table. All the data in the column will be lost.
  - You are about to drop the column `section_id` on the `texts` table. All the data in the column will be lost.
  - You are about to drop the column `section_id` on the `videos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[section_item_id]` on the table `images` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[section_item_id]` on the table `texts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[section_item_id]` on the table `videos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `section_item_id` to the `images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `section_item_id` to the `texts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `section_item_id` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."SectionItemType" AS ENUM ('Text', 'Image', 'Video');

-- DropForeignKey
ALTER TABLE "public"."images" DROP CONSTRAINT "images_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."texts" DROP CONSTRAINT "texts_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."videos" DROP CONSTRAINT "videos_section_id_fkey";

-- DropIndex
DROP INDEX "public"."images_section_id_key";

-- DropIndex
DROP INDEX "public"."texts_section_id_idx";

-- DropIndex
DROP INDEX "public"."texts_section_id_key";

-- DropIndex
DROP INDEX "public"."videos_section_id_key";

-- AlterTable
ALTER TABLE "public"."images" DROP COLUMN "section_id",
ADD COLUMN     "section_item_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."sections" DROP COLUMN "is_reversed";

-- AlterTable
ALTER TABLE "public"."texts" DROP COLUMN "section_id",
ADD COLUMN     "section_item_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."videos" DROP COLUMN "section_id",
ADD COLUMN     "section_item_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."section_items" (
    "id" SERIAL NOT NULL,
    "type" "public"."SectionItemType" NOT NULL,
    "index" INTEGER NOT NULL,
    "section_id" INTEGER NOT NULL,

    CONSTRAINT "section_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "section_items_section_id_index_idx" ON "public"."section_items"("section_id", "index" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "images_section_item_id_key" ON "public"."images"("section_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "texts_section_item_id_key" ON "public"."texts"("section_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "videos_section_item_id_key" ON "public"."videos"("section_item_id");

-- AddForeignKey
ALTER TABLE "public"."section_items" ADD CONSTRAINT "section_items_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "public"."sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."images" ADD CONSTRAINT "images_section_item_id_fkey" FOREIGN KEY ("section_item_id") REFERENCES "public"."section_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."videos" ADD CONSTRAINT "videos_section_item_id_fkey" FOREIGN KEY ("section_item_id") REFERENCES "public"."section_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."texts" ADD CONSTRAINT "texts_section_item_id_fkey" FOREIGN KEY ("section_item_id") REFERENCES "public"."section_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
