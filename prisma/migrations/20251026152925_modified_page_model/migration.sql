/*
  Warnings:

  - A unique constraint covering the columns `[project_id,href]` on the table `pages` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."pages_href_project_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "pages_project_id_href_key" ON "public"."pages"("project_id", "href");
