import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const magoData = {
    nombre: 'Noble Mago',
    slug: 'noble-mago',
    descripcion: 'El Noble Mago es un artista que combina elegancia y magia en cada una de sus presentaciones. Con un estilo único que mezcla magia clásica con elementos modernos, crea experiencias mágicas que cautivan a toda la familia.',
    especialidad: 'Magia Infantil, Magia Clásica, Shows Elegantes',
    email: 'noble.mago@magosinfantiles.com',
    telefono: '+56912345684',
    whatsapp: '+56912345684',
    instagram: 'noblemago',
    facebook: 'noblemago',
    youtube: 'noblemago'
  };

  try {
    const existingMago = await prisma.mago.findUnique({
      where: { slug: 'noble-mago' }
    });

    let nobleMago;
    if (existingMago) {
      nobleMago = await prisma.mago.update({
        where: { slug: 'noble-mago' },
        data: magoData
      });
      console.log('Noble Mago actualizado:', nobleMago);
    } else {
      nobleMago = await prisma.mago.create({
        data: magoData
      });
      console.log('Noble Mago creado:', nobleMago);
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