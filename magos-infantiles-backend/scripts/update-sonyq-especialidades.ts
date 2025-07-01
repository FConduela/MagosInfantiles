import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const sonyq = await prisma.mago.update({
      where: { slug: 'sonyq-2025' },
      data: {
        especialidad: 'Magia Infantil, Magia de Salón, Magia Close up, Magia Cómica'
      }
    });
    console.log('Mago Sonyq actualizado con especialidades:', sonyq.especialidad);
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