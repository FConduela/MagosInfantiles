/*
  Warnings:

  - Added the required column `hora` to the `Noticia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lugar` to the `Noticia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Noticia" ADD COLUMN     "hora" TEXT NOT NULL,
ADD COLUMN     "lugar" TEXT NOT NULL,
ALTER COLUMN "fecha" DROP DEFAULT;
