import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { MagosService } from './magos.service';

@Controller('magos')
export class MagosController {
  constructor(private readonly magosService: MagosService) {}

  @Post()
  async createMago(@Body() data: {
    nombre: string;
    slug: string;
    descripcion: string;
    especialidad: string[];
    email?: string;
    whatsapp?: string;
    instagram?: string;
  }) {
    return this.magosService.createMago(data);
  }

  @Get('kaiser')
  async getMagoKaiser() {
    return this.magosService.getMagoKaiser();
  }

  @Get(':slug')
  async getMagoBySlug(@Param('slug') slug: string) {
    return this.magosService.getMagoBySlug(slug);
  }

  @Get()
  async getAllMagos() {
    return this.magosService.getAllMagos();
  }

  @Put(':id')
  async updateMago(
    @Param('id') id: string,
    @Body() data: {
      nombre: string;
      slug: string;
      descripcion: string;
      especialidad: string[];
      email?: string;
      whatsapp?: string;
      instagram?: string;
    }
  ) {
    return this.magosService.updateMago(parseInt(id), data);
  }

  @Delete(':id')
  async deleteMago(@Param('id') id: string) {
    return this.magosService.deleteMago(parseInt(id));
  }
} 