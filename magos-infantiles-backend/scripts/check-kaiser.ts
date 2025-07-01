import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const kaiser = await prisma.mago.findUnique({
      where: { slug: 'kaiser-2025' },
      select: { nombre: true, especialidad: true }
    });

    console.log('\nEspecialidades de Kaiser:');
    console.log('----------------------------------------');
    console.log(`Nombre: ${kaiser?.nombre}`);
    console.log(`Especialidad: ${kaiser?.especialidad}`);
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