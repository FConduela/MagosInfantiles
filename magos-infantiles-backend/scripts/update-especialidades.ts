import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const especialidadesPorMago = {
    'kaiser-2025': 'Magia Infantil, Magia de Salón, Magia Cómica',
    'alanfu-2025': 'Magia Infantil, Magia de Salón',
    'felipe-verel-2025': 'Magia Infantil, Magia de Salón, Magia Close up',
    'pepe-2025': 'Magia Infantil, Magia de Salón, Magia Close up',
    'alvaro-2025': 'Magia Infantil',
    'sonyq-2025': 'Magia Infantil, Magia de Salón, Magia Close up, Magia Cómica',
    'el-noble-mago-2025': 'Magia Infantil, Magia Clásica, Shows Elegantes',
    'twister-2025': 'Magia Infantil, Magia de Salón, Magia Close up',
    'barba-azul': 'Magia Infantil'
  };

  try {
    for (const [slug, especialidad] of Object.entries(especialidadesPorMago)) {
      const mago = await prisma.mago.update({
        where: { slug },
        data: { especialidad }
      });
      console.log(`Mago ${mago.nombre} actualizado con especialidades: ${especialidad}`);
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