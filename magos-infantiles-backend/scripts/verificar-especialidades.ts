import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const twister = await prisma.mago.findUnique({
      where: { slug: 'twister-2025' },
      select: { nombre: true, especialidad: true }
    });

    const barbaAzul = await prisma.mago.findUnique({
      where: { slug: 'barba-azul' },
      select: { nombre: true, especialidad: true }
    });

    const pepe = await prisma.mago.findUnique({
      where: { slug: 'pepe-2025' },
      select: { nombre: true, especialidad: true }
    });

    const felipeVerel = await prisma.mago.findUnique({
      where: { slug: 'felipe-verel-2025' },
      select: { nombre: true, especialidad: true }
    });

    const alanfu = await prisma.mago.findUnique({
      where: { slug: 'alanfu-2025' },
      select: { nombre: true, especialidad: true }
    });

    const alvaro = await prisma.mago.findUnique({
      where: { slug: 'alvaro-2025' },
      select: { nombre: true, especialidad: true }
    });

    const sonyq = await prisma.mago.findUnique({
      where: { slug: 'sonyq-2025' },
      select: { nombre: true, especialidad: true }
    });

    console.log('\nEspecialidades actuales en la base de datos:');
    console.log('----------------------------------------');
    console.log(`${twister?.nombre}: ${twister?.especialidad}`);
    console.log(`${barbaAzul?.nombre}: ${barbaAzul?.especialidad}`);
    console.log(`${pepe?.nombre}: ${pepe?.especialidad}`);
    console.log(`${felipeVerel?.nombre}: ${felipeVerel?.especialidad}`);
    console.log(`${alanfu?.nombre}: ${alanfu?.especialidad}`);
    console.log(`${alvaro?.nombre}: ${alvaro?.especialidad}`);
    console.log(`${sonyq?.nombre}: ${sonyq?.especialidad}`);
    console.log('----------------------------------------\n');

  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 