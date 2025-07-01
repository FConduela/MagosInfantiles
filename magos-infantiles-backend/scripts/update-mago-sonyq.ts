import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const nuevaDescripcion = `Sonyq es un referente indiscutido de la magia chilena. Su espectáculo combina con maestría la ilusión, el humor inteligente y una narrativa envolvente. Con juegos originales y una creatividad desbordante, Sonyq recurre a distintas disciplinas como la música, el teatro y las sombras chinescas para construir experiencias inolvidables. Su magia es tanto para grandes como para chicos, y siempre deja una huella profunda en el espectador. Más que un mago, es un gran narrador de historias, capaz de transformar lo simple en extraordinario.`;

  try {
    const magoSonyq = await prisma.mago.update({
      where: { slug: 'sonyq' },
      data: {
        descripcion: nuevaDescripcion
      }
    });
    console.log('Mago Sonyq actualizado:', magoSonyq);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 