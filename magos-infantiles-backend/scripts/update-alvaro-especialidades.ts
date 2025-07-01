import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const alvaro = await prisma.mago.update({
      where: { slug: 'alvaro-2025' },
      data: {
        especialidad: 'Magia Infantil'
      }
    });
    console.log('Mago Álvaro actualizado con especialidad:', alvaro.especialidad);
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