import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const barbaAzul = await prisma.mago.update({
      where: { slug: 'barba-azul' },
      data: {
        especialidad: 'Magia Infantil'
      }
    });
    console.log('Mago Barba Azul actualizado con especialidad:', barbaAzul.especialidad);
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