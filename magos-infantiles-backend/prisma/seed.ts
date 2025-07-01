import { PrismaClient } from '../generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Crear usuario admin
  const adminPassword = await bcrypt.hash('Admin123.', 10);
  await prisma.user.upsert({
    where: { email: 'admin@magosinfantiles.com' },
    update: {},
    create: {
      email: 'admin@magosinfantiles.com',
      name: 'Administrador',
      password: adminPassword,
      role: 'admin'
    },
  });

  // Crear usuario editor
  const editorPassword = await bcrypt.hash('Editor123.', 10);
  await prisma.user.upsert({
    where: { email: 'editor@magosinfantiles.com' },
    update: {},
    create: {
      email: 'editor@magosinfantiles.com',
      name: 'Editor',
      password: editorPassword,
      role: 'editor'
    },
  });

  console.log('Base de datos inicializada con usuarios admin y editor');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 