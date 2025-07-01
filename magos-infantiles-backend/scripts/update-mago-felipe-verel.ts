import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const nuevaDescripcion = `Con una chaqueta roja, sombrero negro y una mirada que parece haber visto los secretos del universo, Felipe Verel no es solo un mago: es un viajero entre mundos. Su magia no ocurre solo en las manos… ocurre en los corazones del público. Cada show es una puerta a lo imposible, donde los objetos cobran vida, los recuerdos se transforman en ilusiones, y lo cotidiano se convierte en extraordinario.
Con casi 10 años de experiencia, Felipe combina humor, emoción, narración y asombro en espectáculos diseñados tanto para niños como para toda la familia. Su especialidad es llevar a la audiencia a lugares mágicos, ya sea al centro de un sombrero encantado, a una escuela de hechicería o tras la pista de un zombie travieso.
Ya sea en teatros, eventos familiares o grandes escenarios, el Mago Felipe Verel no solo hace magia… la vive y la comparte.`;

  try {
    const magoFelipeVerel = await prisma.mago.update({
      where: { slug: 'felipe-verel' },
      data: {
        descripcion: nuevaDescripcion
      }
    });
    console.log('Mago Felipe Verel actualizado:', magoFelipeVerel);
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