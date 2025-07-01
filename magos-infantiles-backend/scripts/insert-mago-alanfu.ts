import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const magoData = {
    nombre: 'Alanfu',
    slug: 'alanfu',
    descripcion: 'Alanfu es un mago profesional especializado en magia infantil y familiar. Con una mezcla única de trucos sorprendentes y humor contagioso, crea experiencias mágicas que dejan a los niños maravillados y a los adultos encantados.',
    especialidad: 'Magia Infantil, Magia Familiar, Shows Interactivos',
    email: 'alanfu@magosinfantiles.com',
    telefono: '+56912345679',
    whatsapp: '+56912345679',
    instagram: 'magoalanfu',
    facebook: 'magoalanfu',
    youtube: 'magoalanfu'
  };

  try {
    const existingMago = await prisma.mago.findUnique({
      where: { slug: 'alanfu' }
    });

    let magoAlanfu;
    if (existingMago) {
      magoAlanfu = await prisma.mago.update({
        where: { slug: 'alanfu' },
        data: magoData
      });
      console.log('Mago Alanfu actualizado:', magoAlanfu);
    } else {
      magoAlanfu = await prisma.mago.create({
        data: magoData
      });
      console.log('Mago Alanfu creado:', magoAlanfu);
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