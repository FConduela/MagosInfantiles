import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const magoData = {
    nombre: 'Pepe',
    slug: 'pepe',
    descripcion: 'El Mago Pepe es un artista apasionado por la magia infantil, con más de 15 años de experiencia en el mundo del entretenimiento. Su estilo único combina trucos mágicos sorprendentes con un humor contagioso que cautiva a toda la familia.',
    especialidad: 'Magia Infantil, Magia Familiar, Shows Interactivos',
    email: 'pepe@magosinfantiles.com',
    telefono: '+56912345680',
    whatsapp: '+56912345680',
    instagram: 'magopepe',
    facebook: 'magopepe',
    youtube: 'magopepe'
  };

  try {
    const existingMago = await prisma.mago.findUnique({
      where: { slug: 'pepe' }
    });

    let magoPepe;
    if (existingMago) {
      magoPepe = await prisma.mago.update({
        where: { slug: 'pepe' },
        data: magoData
      });
      console.log('Mago Pepe actualizado:', magoPepe);
    } else {
      magoPepe = await prisma.mago.create({
        data: magoData
      });
      console.log('Mago Pepe creado:', magoPepe);
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