import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const nuevaDescripcion = `Noble Mago es un mago infantil con más de 15 años de experiencia, formado en la escuela de magia más famosa del mundo Hogwarts. Su show, lleno de colores, sorpresas y carcajadas, ha encantado a miles de niños y familias, combinando la auténtica ilusión mágica con una puesta en escena divertida y participativa.

Cada presentación del Noble Mago es un viaje al mundo de la imaginación, donde los pequeños son los verdaderos protagonistas y la alegría se siente en el aire.`;

  try {
    const magoNoble = await prisma.mago.update({
      where: { slug: 'noble-mago' },
      data: {
        descripcion: nuevaDescripcion
      }
    });
    console.log('Noble Mago actualizado:', magoNoble);
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