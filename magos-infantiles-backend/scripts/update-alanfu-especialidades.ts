import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const alanfu = await prisma.mago.update({
      where: { slug: 'alanfu-2025' },
      data: {
        especialidad: 'Magia Infantil, Magia de Salón'
      }
    });
    console.log('Mago Alanfu actualizado con especialidades:', alanfu.especialidad);
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