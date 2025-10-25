/*
  Warnings:

  - Added the required column `page_id` to the `sections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."sections" ADD COLUMN     "page_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."pages" (
    "id" SERIAL NOT NULL,
    "index" INTEGER NOT NULL,
    "href" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "pages_project_id_index_idx" ON "public"."pages"("project_id", "index" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "pages_href_project_id_key" ON "public"."pages"("href", "project_id");

-- CreateIndex
CREATE INDEX "sections_page_id_index_idx" ON "public"."sections"("page_id", "index" ASC);

-- AddForeignKey
ALTER TABLE "public"."pages" ADD CONSTRAINT "pages_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sections" ADD CONSTRAINT "sections_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
