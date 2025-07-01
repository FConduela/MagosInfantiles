-- AlterTable
ALTER TABLE "Noticia" ADD COLUMN     "aprobadoPor" INTEGER,
ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'pendiente',
ADD COLUMN     "rechazadoPor" INTEGER;
