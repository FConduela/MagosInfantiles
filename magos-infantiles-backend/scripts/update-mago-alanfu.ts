import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const nuevaDescripcion = `EN LA REGIÓN DE LOS LAGOS, ALANFÚ 
PRESENTA  MAGIA Y ALEGRIA en sus show infantiles y también para adultos.
Su GRAN EXPERIENCIA artística y sus largos años de trayectoria, le han permitido compartir  con grandes magos a nivel mundial y pertenecer al estaff de magos fundadores como el Circulo mágico de Chile, Caballeros del Ilusionismo, magos infantiles.cl . También participó en la  Sociedad Chilena De Ilusionismo. Ha trabajado en el.desarrollo de varios talleres escolares.
HERNÁN GONZALEZ es ALANFÚ. Presenta Magia familiar en cumpleaños inolvidables y eventos, vecinales o de empresas. Ha sido creador y fabricante de algunas hermosas ilusiones con cartas, Cubiletes de aparición,  muñecos como Elmo, el perro Cuchuflí, etc.
En las fiestas infantiles uno de sus objetivos importantes es la participación y estipulación de los niños haciéndolos sentir protagonistas.
A través de los años, Alanfú ha podido participar en diversos encuentros y congresos de magia dentro y fuera de nuestro país. En sus años de juventud tuvo la oportunidad de participar en algunos programas infantiles en canal 13 de la Tv Chilena. 
Actualmente ya en su tercera edad, se encuentra en la hermosa Región De Los Lagos en la Ciudad de Puerto Varas, haciendo disfrutar de sus shows a todo aquel que lo requiera.
Sus efectos han abarcado desde la micromagia a grandes ilusiones.
Su vida ha transcurrido entre la pedagogía y la magia. Siendo más antiguo comí mago, ha podido combinar ambas disciplinas colaborandose una con otra.`;

  try {
    const magoAlanfu = await prisma.mago.update({
      where: { slug: 'alanfu' },
      data: {
        descripcion: nuevaDescripcion
      }
    });
    console.log('Mago Alanfu actualizado:', magoAlanfu);
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