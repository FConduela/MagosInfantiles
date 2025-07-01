import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Lista de slugs sin el sufijo -2025 que queremos eliminar
    const slugsToDelete = ['sonyq', 'noble-mago'];

    for (const slug of slugsToDelete) {
      try {
        const mago = await prisma.mago.delete({
          where: { slug }
        });
        console.log(`Eliminado mago duplicado: ${mago.nombre} (${mago.slug})`);
      } catch (error) {
        if (error.code === 'P2025') {
          console.log(`El mago con slug ${slug} ya no existe`);
        } else {
          throw error;
        }
      }
    }

    console.log('Proceso de eliminación de duplicados completado');
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 