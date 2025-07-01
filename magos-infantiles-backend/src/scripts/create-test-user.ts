import { PrismaClient } from '../../generated/prisma';
import * as bcrypt from 'bcrypt';

async function createTestUser() {
  const prisma = new PrismaClient();
  
  try {
    const hashedPassword = await bcrypt.hash('test123', 10);
    
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: hashedPassword,
        name: 'Usuario de Prueba',
      },
    });
    
    console.log('Usuario de prueba creado:', user);
  } catch (error) {
    console.error('Error al crear usuario de prueba:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser(); 