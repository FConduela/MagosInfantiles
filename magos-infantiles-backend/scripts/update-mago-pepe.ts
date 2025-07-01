import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const nuevaDescripcion = `Mago Pepe se gesta en 2010, luego de ser el mago sapick ,artista que nace en la sociedad Chilena de ilusionismo, en donde da sus primeros pasos. Al pasar de los años, forma parte de la Cofradia magica de Chile, publicando su magia en la revista de dicha insititucion y asisitendo a las reuniones periodicas de esta. Luego de asistir al encuentro de magos infantiles en concepcion en el año 2016, decide avocarse unica y exclusivamente a la magia infantil, para luego del tercer encuentro de magos infantiles, pto montt 2017, formar parte de la directiva de la Asociacion de Magos Infantiles de Chile en su sede de Santiago`;

  try {
    const magoPepe = await prisma.mago.update({
      where: { slug: 'pepe' },
      data: {
        descripcion: nuevaDescripcion
      }
    });
    console.log('Mago Pepe actualizado:', magoPepe);
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