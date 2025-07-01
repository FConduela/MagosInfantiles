import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class NoticiasService {
  constructor(private prisma: PrismaService) {}

  async create(createNoticiaDto: CreateNoticiaDto, userId: number, file: Express.Multer.File) {
    try {
      console.log('Iniciando creación de noticia...');
      const { titulo, contenido, fecha, hora, lugar } = createNoticiaDto;
      
      // Verificar si el usuario existe
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        console.error('Usuario no encontrado:', userId);
        throw new BadRequestException('Usuario no encontrado');
      }

      console.log('Usuario encontrado:', user);

      const estado = user.role === 'admin' ? 'aprobado' : 'pendiente';
      const aprobadoPor = user.role === 'admin' ? userId : null;
      
      // Convertir la fecha de string a Date
      const fechaDate = fecha ? new Date(fecha) : new Date();
      
      console.log('Datos de la noticia a crear:', {
        titulo,
        contenido,
        imagen: file ? file.filename : null,
        fecha: fechaDate,
        hora,
        lugar,
        estado,
        aprobadoPor
      });

      const noticia = await this.prisma.noticia.create({
        data: {
          titulo,
          contenido,
          imagen: file ? file.filename : null,
          fecha: fechaDate,
          hora: hora || '',
          lugar,
          estado,
          aprobadoPor,
        },
      });

      console.log('Noticia creada exitosamente:', noticia);
      return noticia;
    } catch (error) {
      console.error('Error detallado en create:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error al crear la noticia: ' + error.message);
    }
  }

  async findAll() {
    try {
      return await this.prisma.noticia.findMany({
        where: {
          estado: 'aprobado'
        },
        orderBy: [
          { createdAt: 'desc' },
          { fecha: 'desc' }
        ],
      });
    } catch (error) {
      console.error('Error en findAll:', error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.noticia.findUnique({
        where: { id },
        select: {
          id: true,
          titulo: true,
          contenido: true,
          imagen: true,
          fecha: true,
          hora: true,
          lugar: true,
          destacada: true,
          estado: true,
          aprobadoPor: true,
          rechazadoPor: true,
          createdAt: true,
          updatedAt: true
        }
      });
    } catch (error) {
      console.error('Error en findOne:', error);
      throw error;
    }
  }

  async update(id: number, updateNoticiaDto: UpdateNoticiaDto, file?: Express.Multer.File) {
    try {
      const { titulo, contenido, fecha, hora, lugar } = updateNoticiaDto;
      
      // Convertir la fecha de string a Date si existe
      const fechaDate = fecha ? new Date(fecha) : undefined;

      // Si hay un archivo nuevo, eliminar el anterior
      if (file) {
        const noticiaActual = await this.prisma.noticia.findUnique({
          where: { id },
        });

        if (noticiaActual?.imagen) {
          const rutaImagen = path.join(process.cwd(), 'uploads', 'noticias', noticiaActual.imagen);
          try {
            fs.unlinkSync(rutaImagen);
          } catch (error) {
            console.error('Error al eliminar imagen anterior:', error);
          }
        }
      }
      
      return await this.prisma.noticia.update({
        where: { id },
        data: {
          titulo,
          contenido,
          imagen: file ? file.filename : undefined,
          fecha: fechaDate,
          hora: hora || undefined,
          lugar,
        },
      });
    } catch (error) {
      console.error('Error en update:', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      // Primero obtenemos la noticia para verificar si tiene una imagen
      const noticia = await this.prisma.noticia.findUnique({
        where: { id },
      });

      if (!noticia) {
        throw new Error('Noticia no encontrada');
      }

      // Si la noticia tiene una imagen, la eliminamos
      if (noticia.imagen) {
        const rutaImagen = path.join(process.cwd(), 'uploads', 'noticias', noticia.imagen);
        try {
          fs.unlinkSync(rutaImagen);
        } catch (error) {
          console.error('Error al eliminar imagen:', error);
        }
      }

      // Eliminamos la noticia
      await this.prisma.noticia.delete({
        where: { id },
      });

      return { message: 'Noticia eliminada correctamente' };
    } catch (error) {
      console.error('Error en remove:', error);
      throw error;
    }
  }

  async findPendientes() {
    try {
      return await this.prisma.noticia.findMany({
        where: { estado: 'pendiente' },
        orderBy: [
          { createdAt: 'desc' },
          { fecha: 'desc' }
        ],
      });
    } catch (error) {
      console.error('Error en findPendientes:', error);
      throw error;
    }
  }

  async aprobarNoticia(id: number, userId: number) {
    try {
      return await this.prisma.noticia.update({
        where: { id },
        data: { estado: 'aprobado', aprobadoPor: userId },
      });
    } catch (error) {
      console.error('Error en aprobarNoticia:', error);
      throw error;
    }
  }

  async rechazarNoticia(id: number, userId: number) {
    try {
      // Primero obtenemos la noticia para verificar si tiene una imagen
      const noticia = await this.prisma.noticia.findUnique({
        where: { id },
      });

      if (!noticia) {
        throw new Error('Noticia no encontrada');
      }

      // Eliminamos la noticia
      await this.prisma.noticia.delete({
        where: { id },
      });

      return { message: 'Noticia rechazada y eliminada correctamente' };
    } catch (error) {
      console.error('Error en rechazarNoticia:', error);
      throw error;
    }
  }
} 