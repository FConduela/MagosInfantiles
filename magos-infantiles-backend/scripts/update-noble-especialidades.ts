import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const noble = await prisma.mago.update({
      where: { slug: 'el-noble-mago-2025' },
      data: {
        especialidad: 'Magia Infantil'
      }
    });

    console.log(`Mago Noble actualizado con la especialidad: "${noble.especialidad}"`);
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