import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const magoKaiserActualizado = await prisma.mago.update({
    where: {
      id: 1
    },
    data: {
      whatsapp: '+56973932362',
      especialidad: 'Magia Infantil\nMagia de Salón\nMagia Cómica'
    }
  });

  console.log('Mago Kaiser actualizado:', magoKaiserActualizado);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 