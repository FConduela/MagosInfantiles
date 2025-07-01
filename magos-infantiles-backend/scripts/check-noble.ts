import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Intentar encontrar el mago con ambos slugs posibles
    const noble1 = await prisma.mago.findUnique({
      where: { slug: 'noble-mago' },
      select: { nombre: true, slug: true, especialidad: true }
    });

    const noble2 = await prisma.mago.findUnique({
      where: { slug: 'el-noble-mago-2025' },
      select: { nombre: true, slug: true, especialidad: true }
    });

    console.log('\nVerificación del Noble Mago:');
    console.log('----------------------------------------');
    console.log('Buscando con slug "noble-mago":');
    console.log(noble1 ? `Encontrado: ${noble1.nombre} (${noble1.slug})` : 'No encontrado');
    console.log('\nBuscando con slug "el-noble-mago-2025":');
    console.log(noble2 ? `Encontrado: ${noble2.nombre} (${noble2.slug})` : 'No encontrado');
    console.log('----------------------------------------\n');

  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 