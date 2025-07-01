import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const magoKaiser = await prisma.mago.create({
    data: {
      id: 1,
      nombre: 'Kaiser',
      slug: 'kaiser',
      descripcion: 'Kaiser comenzó su viaje en el mundo de la magia en 2008 como un apasionado aficionado. Su dedicación y talento lo llevaron a dar un salto profesional en 2014, cuando descubrió que podía transformar su pasión en una carrera. Este cambio marcó el inicio de una evolución constante en su arte, perfeccionando su espectáculo y desarrollando un estilo único. En 2018, su innovador enfoque y su distintivo toque de humor le valieron el prestigioso premio de Mago Revelación otorgado por Santiago Mágico. Hoy, Kaiser se destaca por su magistral combinación de magia y comedia, creando experiencias inolvidables que cautivan a audiencias de todas las edades.',
      especialidad: 'Magia Infantil, Magia de Salón, Magia Cómica',
      email: 'felipecrilusionista@gmail.com',
      telefono: '+56973932362',
      instagram: 'kaisermago'
    }
  });

  console.log('Mago Kaiser creado:', magoKaiser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 