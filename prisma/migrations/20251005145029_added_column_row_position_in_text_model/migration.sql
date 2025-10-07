-- CreateEnum
CREATE TYPE "public"."RowPosition" AS ENUM ('Left', 'Center', 'Right');

-- AlterTable
ALTER TABLE "public"."texts" ADD COLUMN     "rowPosition" "public"."RowPosition" NOT NULL DEFAULT 'Left';
