import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const magoData = {
    nombre: 'Felipe Verel',
    slug: 'felipe-verel',
    descripcion: 'El Mago Felipe Verel es un artista completo que combina magia, humor y participación del público. Con más de 10 años de experiencia, ha desarrollado un estilo único que cautiva tanto a niños como adultos, creando momentos mágicos inolvidables.',
    especialidad: 'Magia Infantil, Magia de Salón, Shows Interactivos',
    email: 'felipe.verel@magosinfantiles.com',
    telefono: '+56912345682',
    whatsapp: '+56912345682',
    instagram: 'magofelipeverel',
    facebook: 'magofelipeverel',
    youtube: 'magofelipeverel'
  };

  try {
    const existingMago = await prisma.mago.findUnique({
      where: { slug: 'felipe-verel' }
    });

    let magoFelipeVerel;
    if (existingMago) {
      magoFelipeVerel = await prisma.mago.update({
        where: { slug: 'felipe-verel' },
        data: magoData
      });
      console.log('Mago Felipe Verel actualizado:', magoFelipeVerel);
    } else {
      magoFelipeVerel = await prisma.mago.create({
        data: magoData
      });
      console.log('Mago Felipe Verel creado:', magoFelipeVerel);
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