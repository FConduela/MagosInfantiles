import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const twister = await prisma.mago.update({
      where: { slug: 'twister-2025' },
      data: {
        especialidad: 'Magia Infantil, Magia de Salón, Magia Close up'
      }
    });
    console.log('Mago Twister actualizado con especialidades:', twister.especialidad);
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