import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const nuevaDescripcion = `La personalidad del Mago Álvaro es una mezcla de frescura y magia.
Rutinas y efectos mágicos que mezclan perfectamente las risas,  el asombro, las sorpresas y entretención. 
Con más de 10 años de experiencia  y constantemente actualizando su espectáculo lo han llevado a ser uno de los magos infantiles más cotizados de Santiago.`;

  try {
    const magoAlvaro = await prisma.mago.update({
      where: { slug: 'alvaro' },
      data: {
        descripcion: nuevaDescripcion
      }
    });
    console.log('Mago Álvaro actualizado:', magoAlvaro);
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