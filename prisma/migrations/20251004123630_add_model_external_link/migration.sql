-- CreateTable
CREATE TABLE "public"."external_links" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL DEFAULT 'Details',
    "url" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "text_id" INTEGER NOT NULL,

    CONSTRAINT "external_links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "external_links_text_id_key" ON "public"."external_links"("text_id");

-- AddForeignKey
ALTER TABLE "public"."external_links" ADD CONSTRAINT "external_links_text_id_fkey" FOREIGN KEY ("text_id") REFERENCES "public"."texts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
