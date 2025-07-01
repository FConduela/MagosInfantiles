import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Configurar CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3002', 'http://localhost:3001'], // URLs del frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Configurar prefijo global
  app.setGlobalPrefix('api');

  // Configurar validación
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  // Asegurar que la carpeta de uploads exista
  const uploadsPath = join(process.cwd(), 'uploads');
  const noticiasPath = join(uploadsPath, 'noticias');
  
  if (!existsSync(uploadsPath)) {
    mkdirSync(uploadsPath, { recursive: true });
  }
  if (!existsSync(noticiasPath)) {
    mkdirSync(noticiasPath, { recursive: true });
  }

  // Configurar archivos estáticos
  app.useStaticAssets(uploadsPath, {
    prefix: '/uploads',
  });

  // Iniciar el servidor
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Aplicación corriendo en: http://localhost:${port}`);
  console.log('Ruta de uploads:', uploadsPath);
}

bootstrap();
