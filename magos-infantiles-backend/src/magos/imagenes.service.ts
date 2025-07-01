import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ImagenesService {
  constructor(private readonly prisma: PrismaService) {}

  async getImagenesByMagoAndTipo(slug: string, tipo: string) {
    const mago = await this.prisma.mago.findUnique({
      where: { slug },
      include: {
        imagenes: {
          where: { tipo },
          orderBy: { orden: 'asc' },
          select: {
            id: true,
            alt: true,
            tipo: true,
            orden: true,
            createdAt: true
          }
        }
      }
    });

    if (!mago) {
      throw new Error('Mago no encontrado');
    }

    return {
      mago: {
        id: mago.id,
        nombre: mago.nombre,
        slug: mago.slug
      },
      imagenes: mago.imagenes.map(img => ({
        ...img,
        url: `/api/imagenes/${img.id}`
      }))
    };
  }

  async getImagenById(id: number) {
    return this.prisma.imagen.findUnique({
      where: { id }
    });
  }

  async getImagenesByMagoId(magoId: number, tipo?: string) {
    const where: any = { magoId };
    if (tipo) {
      where.tipo = tipo;
    }

    return this.prisma.imagen.findMany({
      where,
      orderBy: { orden: 'asc' },
      select: {
        id: true,
        alt: true,
        tipo: true,
        orden: true,
        createdAt: true
      }
    });
  }
} 