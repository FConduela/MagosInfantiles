import { PrismaClient } from '../generated/prisma';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// Usar ruta relativa desde magos-infantiles-backend hacia magos-infantiles/public/images/magos
const IMAGES_ROOT = path.resolve(__dirname, '../../magos-infantiles/public/images/magos');

async function migrateAllImages() {
  try {
    const magos = await prisma.mago.findMany();
    
    for (const mago of magos) {
      console.log(`\n📁 Procesando mago: ${mago.nombre} (${mago.slug})`);
      
      const magoDir = path.join(IMAGES_ROOT, mago.slug);
      if (!fs.existsSync(magoDir)) {
        console.log(`❌ No existe carpeta para el mago: ${mago.slug}`);
        continue;
      }

      const files = fs.readdirSync(magoDir);
      
      // Procesar imágenes de galería
      const galleryFiles = files.filter(f => f.startsWith('gallery-') && f.endsWith('.jpg'));
      for (const file of galleryFiles) {
        await processImage(mago, file, 'galeria', magoDir);
      }

      // Procesar imágenes de carrusel
      const carouselFiles = files.filter(f => f.startsWith('carousel-') && f.endsWith('.jpg'));
      for (const file of carouselFiles) {
        await processImage(mago, file, 'carousel', magoDir);
      }

      // Procesar imagen de show
      const showFiles = files.filter(f => f === 'show.jpg');
      for (const file of showFiles) {
        await processImage(mago, file, 'show', magoDir);
      }
    }
    
    console.log('\n✅ Migración de todas las imágenes completada.');
  } catch (error) {
    console.error('❌ Error en la migración:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function processImage(mago: any, file: string, tipo: string, magoDir: string) {
  try {
    const filePath = path.join(magoDir, file);
    const buffer = fs.readFileSync(filePath);
    
    // Determinar el orden basado en el tipo y nombre del archivo
    let orden = 0;
    if (tipo === 'galeria') {
      orden = parseInt(file.match(/gallery-(\d+)\.jpg/)?.[1] || '0', 10);
    } else if (tipo === 'carousel') {
      orden = parseInt(file.match(/carousel-(\d+)\.jpg/)?.[1] || '0', 10);
    } else if (tipo === 'show') {
      orden = 1; // Solo hay una imagen de show
    }

    // Verificar si ya existe en la base de datos
    const exists = await prisma.imagen.findFirst({
      where: {
        magoId: mago.id,
        tipo: tipo,
        orden: orden
      }
    });

    if (exists) {
      console.log(`  ⚠️  Ya existe imagen de ${tipo} para ${mago.slug} orden ${orden}`);
      return;
    }

    // Crear la imagen en la base de datos
    await prisma.imagen.create({
      data: {
        imagen: buffer,
        alt: `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} ${mago.nombre}`,
        tipo: tipo,
        orden: orden,
        magoId: mago.id
      }
    });

    console.log(`  ✅ Imagen subida: ${file} (${tipo}) para mago ${mago.slug}`);
  } catch (error) {
    console.error(`  ❌ Error procesando ${file}:`, error);
  }
}

migrateAllImages(); 