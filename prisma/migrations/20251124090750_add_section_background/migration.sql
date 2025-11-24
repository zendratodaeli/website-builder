-- CreateTable
CREATE TABLE "public"."section_backgrounds" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL DEFAULT '',
    "opacity" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "blur" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "section_id" INTEGER NOT NULL,

    CONSTRAINT "section_backgrounds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "section_backgrounds_section_id_key" ON "public"."section_backgrounds"("section_id");

-- AddForeignKey
ALTER TABLE "public"."section_backgrounds" ADD CONSTRAINT "section_backgrounds_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "public"."sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
