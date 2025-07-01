import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const magoData = {
    nombre: 'Sonyq',
    slug: 'sonyq',
    descripcion: 'El Mago Sonyq es un artista innovador que combina magia tradicional con elementos modernos y tecnológicos. Su estilo único y su capacidad para sorprender al público lo han convertido en uno de los magos más destacados del circuito infantil.',
    especialidad: 'Magia Infantil, Magia Moderna, Shows Tecnológicos',
    email: 'sonyq@magosinfantiles.com',
    telefono: '+56912345683',
    whatsapp: '+56912345683',
    instagram: 'magosonyq',
    facebook: 'magosonyq',
    youtube: 'magosonyq'
  };

  try {
    const existingMago = await prisma.mago.findUnique({
      where: { slug: 'sonyq' }
    });

    let magoSonyq;
    if (existingMago) {
      magoSonyq = await prisma.mago.update({
        where: { slug: 'sonyq' },
        data: magoData
      });
      console.log('Mago Sonyq actualizado:', magoSonyq);
    } else {
      magoSonyq = await prisma.mago.create({
        data: magoData
      });
      console.log('Mago Sonyq creado:', magoSonyq);
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