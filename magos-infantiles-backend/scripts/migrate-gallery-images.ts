import { PrismaClient } from '../generated/prisma';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// Usar ruta relativa desde magos-infantiles-backend hacia magos-infantiles/public/images/magos
const IMAGES_ROOT = path.resolve(__dirname, '../../magos-infantiles/public/images/magos');

async function migrateGalleryImages() {
  try {
    const magos = await prisma.mago.findMany();
    for (const mago of magos) {
      const magoDir = path.join(IMAGES_ROOT, mago.slug);
      if (!fs.existsSync(magoDir)) {
        console.log(`No existe carpeta para el mago: ${mago.slug}`);
        continue;
      }
      const files = fs.readdirSync(magoDir).filter(f => f.startsWith('gallery-') && f.endsWith('.jpg'));
      for (const file of files) {
        const filePath = path.join(magoDir, file);
        const buffer = fs.readFileSync(filePath);
        // Verificar si ya existe en la base de datos
        const exists = await prisma.imagen.findFirst({
          where: {
            magoId: mago.id,
            tipo: 'galeria',
            orden: parseInt(file.match(/gallery-(\d+)\.jpg/)?.[1] || '0', 10)
          }
        });
        if (exists) {
          console.log(`Ya existe imagen de galería para ${mago.slug} orden ${exists.orden}`);
          continue;
        }
        await prisma.imagen.create({
          data: {
            imagen: buffer,
            alt: `Galería ${mago.nombre}`,
            tipo: 'galeria',
            orden: parseInt(file.match(/gallery-(\d+)\.jpg/)?.[1] || '0', 10),
            magoId: mago.id
          }
        });
        console.log(`Imagen subida: ${file} para mago ${mago.slug}`);
      }
    }
    console.log('✅ Migración de imágenes de galería completada.');
  } catch (error) {
    console.error('❌ Error en la migración:', error);
  } finally {
    await prisma.$disconnect();
  }
}

migrateGalleryImages(); 