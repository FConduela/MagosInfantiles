import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const pepe = await prisma.mago.update({
      where: { slug: 'pepe-2025' },
      data: {
        especialidad: 'Magia Infantil, Magia de Salón, Magia Close up'
      }
    });
    console.log('Mago Pepe actualizado con especialidades:', pepe.especialidad);
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