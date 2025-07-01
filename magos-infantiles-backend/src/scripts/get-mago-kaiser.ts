import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const magoKaiser = await prisma.mago.findUnique({
      where: {
        id: 1
      }
    });

    console.log('Datos del Mago Kaiser:', magoKaiser);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 