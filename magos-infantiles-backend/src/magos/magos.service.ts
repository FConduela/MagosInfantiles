import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MagosService {
  constructor(private prisma: PrismaService) {}

  async getMagoKaiser() {
    try {
      const mago = await this.prisma.mago.findUnique({
        where: {
          id: 1
        },
        select: {
          id: true,
          nombre: true,
          descripcion: true,
          especialidad: true,
          email: true,
          telefono: true,
          whatsapp: true,
          instagram: true,
          facebook: true,
          youtube: true,
          servicios: true
        }
      });

      if (!mago) {
        throw new Error('Mago Kaiser no encontrado');
      }

      return {
        ...mago,
        especialidad: mago.especialidad.split(',').map(esp => esp.trim()),
        redesSociales: {
          instagram: mago.instagram,
          facebook: mago.facebook,
          youtube: mago.youtube
        }
      };
    } catch (error) {
      console.error('Error al obtener Mago Kaiser:', error);
      throw error;
    }
  }

  async getMagoBySlug(slug: string) {
    try {
      const mago = await this.prisma.mago.findUnique({
        where: {
          slug: slug
        },
        select: {
          id: true,
          nombre: true,
          descripcion: true,
          especialidad: true,
          email: true,
          telefono: true,
          whatsapp: true,
          instagram: true,
          facebook: true,
          youtube: true,
          servicios: true
        }
      });

      if (!mago) {
        throw new Error(`Mago con slug ${slug} no encontrado`);
      }

      return {
        ...mago,
        especialidad: mago.especialidad.split(',').map(esp => esp.trim()),
        redesSociales: {
          instagram: mago.instagram,
          facebook: mago.facebook,
          youtube: mago.youtube
        }
      };
    } catch (error) {
      console.error(`Error al obtener mago con slug ${slug}:`, error);
      throw error;
    }
  }

  async getAllMagos() {
    try {
      const magos = await this.prisma.mago.findMany({
        select: {
          id: true,
          nombre: true,
          slug: true,
          descripcion: true,
          especialidad: true,
          email: true,
          telefono: true,
          whatsapp: true,
          instagram: true,
          facebook: true,
          youtube: true,
          servicios: true
        }
      });

      return magos.map(mago => ({
        ...mago,
        especialidad: mago.especialidad.split(',').map(esp => esp.trim()),
        redesSociales: {
          instagram: mago.instagram,
          facebook: mago.facebook,
          youtube: mago.youtube
        }
      }));
    } catch (error) {
      console.error('Error al obtener magos:', error);
      throw error;
    }
  }

  async createMago(data: {
    nombre: string;
    slug: string;
    descripcion: string;
    especialidad: string[];
    email?: string;
    whatsapp?: string;
    instagram?: string;
  }) {
    try {
      const mago = await this.prisma.mago.create({
        data: {
          nombre: data.nombre,
          slug: data.slug.toLowerCase().replace(/\s+/g, '-'),
          descripcion: data.descripcion,
          especialidad: data.especialidad.join(', '),
          email: data.email,
          whatsapp: data.whatsapp,
          instagram: data.instagram
        }
      });
      return {
        ...mago,
        especialidad: mago.especialidad.split(',').map(esp => esp.trim()),
        redesSociales: {
          instagram: mago.instagram,
          facebook: mago.facebook,
          youtube: mago.youtube
        }
      };
    } catch (error) {
      console.error('Error al crear mago:', error);
      throw error;
    }
  }

  async updateMago(id: number, data: {
    nombre: string;
    slug: string;
    descripcion: string;
    especialidad: string[];
    email?: string;
    whatsapp?: string;
    instagram?: string;
  }) {
    try {
      const mago = await this.prisma.mago.update({
        where: {
          id: id
        },
        data: {
          nombre: data.nombre,
          slug: data.slug.toLowerCase().replace(/\s+/g, '-'),
          descripcion: data.descripcion,
          especialidad: data.especialidad.join(', '),
          email: data.email,
          whatsapp: data.whatsapp,
          instagram: data.instagram
        }
      });
      return {
        ...mago,
        especialidad: mago.especialidad.split(',').map(esp => esp.trim()),
        redesSociales: {
          instagram: mago.instagram,
          facebook: mago.facebook,
          youtube: mago.youtube
        }
      };
    } catch (error) {
      console.error('Error al actualizar mago:', error);
      throw error;
    }
  }

  async deleteMago(id: number) {
    try {
      const mago = await this.prisma.mago.delete({
        where: {
          id: id
        }
      });
      return mago;
    } catch (error) {
      console.error('Error al eliminar mago:', error);
      throw error;
    }
  }
} 