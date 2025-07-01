import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const magoData = {
    nombre: 'Twister',
    slug: 'twister',
    descripcion: 'El Mago Twister es un artista versátil que combina magia, humor y participación del público para crear shows inolvidables. Con más de 10 años de experiencia, ha desarrollado un estilo único que cautiva tanto a niños como adultos. Sus rutinas incluyen magia de cerca, ilusiones de escenario y efectos visuales impactantes, todo presentado con un toque de comedia que mantiene al público entretenido de principio a fin.',
    especialidad: 'Magia Infantil, Magia de Salón, Magia Cómica',
    email: 'twister@magosinfantiles.com',
    telefono: '+56912345678',
    whatsapp: '+56912345678',
    instagram: 'magotwister',
    facebook: 'magotwister',
    youtube: 'magotwister'
  };

  try {
    const existingMago = await prisma.mago.findUnique({
      where: { slug: 'twister' }
    });

    let magoTwister;
    if (existingMago) {
      magoTwister = await prisma.mago.update({
        where: { slug: 'twister' },
        data: magoData
      });
      console.log('Mago Twister actualizado:', magoTwister);
    } else {
      magoTwister = await prisma.mago.create({
        data: magoData
      });
      console.log('Mago Twister creado:', magoTwister);
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