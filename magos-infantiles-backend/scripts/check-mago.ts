import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function checkMago() {
  try {
    const magos = await prisma.mago.findMany({
      where: {
        nombre: {
          contains: 'Alan'
        }
      }
    });

    console.log('Magos encontrados:', magos);
  } catch (error) {
    console.error('Error al buscar magos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkMago(); 