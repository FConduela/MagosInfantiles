import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const felipeVerel = await prisma.mago.update({
      where: { slug: 'felipe-verel-2025' },
      data: {
        especialidad: 'Magia Infantil, Magia de Salón, Magia Close up'
      }
    });
    console.log('Mago Felipe Verel actualizado con especialidades:', felipeVerel.especialidad);
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