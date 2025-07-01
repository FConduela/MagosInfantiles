import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const magoData = {
    nombre: 'Álvaro',
    slug: 'alvaro',
    descripcion: 'El Mago Álvaro es un artista versátil que combina magia clásica con elementos modernos. Su carisma y habilidad para conectar con el público lo han convertido en uno de los magos más solicitados para eventos infantiles y familiares.',
    especialidad: 'Magia Infantil, Magia de Salón, Magia Cómica',
    email: 'alvaro@magosinfantiles.com',
    telefono: '+56912345681',
    whatsapp: '+56912345681',
    instagram: 'magoalvaro',
    facebook: 'magoalvaro',
    youtube: 'magoalvaro'
  };

  try {
    const existingMago = await prisma.mago.findUnique({
      where: { slug: 'alvaro' }
    });

    let magoAlvaro;
    if (existingMago) {
      magoAlvaro = await prisma.mago.update({
        where: { slug: 'alvaro' },
        data: magoData
      });
      console.log('Mago Álvaro actualizado:', magoAlvaro);
    } else {
      magoAlvaro = await prisma.mago.create({
        data: magoData
      });
      console.log('Mago Álvaro creado:', magoAlvaro);
    }
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