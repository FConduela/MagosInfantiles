import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function checkMagos() {
  try {
    const magos = await prisma.mago.findMany({
      select: {
        id: true,
        nombre: true,
        slug: true
      }
    });

    console.log('📋 Magos en la base de datos:');
    console.log('==============================');
    
    magos.forEach(mago => {
      console.log(`ID: ${mago.id} | Nombre: ${mago.nombre} | Slug: ${mago.slug}`);
    });

    console.log(`\nTotal de magos: ${magos.length}`);

  } catch (error) {
    console.error('❌ Error al obtener magos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkMagos(); 