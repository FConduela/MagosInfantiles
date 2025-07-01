import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function updateEmail() {
  try {
    const updatedMago = await prisma.mago.update({
      where: {
        slug: 'alanfu-2025'
      },
      data: {
        email: 'alanfu7@gmail.com'
      }
    });

    console.log('Correo electrónico actualizado exitosamente:', updatedMago);
  } catch (error) {
    console.error('Error al actualizar el correo electrónico:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateEmail(); 