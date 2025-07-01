import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const nuevaDescripcion = `Mago Barba azul da sus primeros pasos en la magia en 2010, en la Escuela del desaparecido y recordado Mago Larrain, inclinándose desde sus inicios por la rama de Magia Infantil.
Su pasión por la magia lo lleva a participar en diversos congresos y encuentros nacionales e internacionales, para perfeccionarse y compartir experiencias con otros magos infantiles, enriqueciéndose así mutuamente.
7 años de experiencia actuando en fiestas infantiles, cumpleaños particulares, eventos de colegios, etc. garantizan a usted un show lleno de sorpresas, asombro y sana diversión.`;

  try {
    const barbaAzul = await prisma.mago.update({
      where: { slug: 'barba-azul' },
      data: {
        descripcion: nuevaDescripcion,
        nombre: 'Barba Azul',
        slug: 'barba-azul-2025'
      }
    });
    console.log('Mago Barba Azul actualizado:', barbaAzul);
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