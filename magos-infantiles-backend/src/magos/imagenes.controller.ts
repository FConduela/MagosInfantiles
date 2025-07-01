import { Controller, Get, Param, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { ImagenesService } from './imagenes.service';

@Controller('imagenes')
export class ImagenesController {
  constructor(private readonly imagenesService: ImagenesService) {}

  @Get('mago/:slug/galeria')
  async getGaleriaMago(@Param('slug') slug: string) {
    return this.imagenesService.getImagenesByMagoAndTipo(slug, 'galeria');
  }

  @Get('mago/:slug/carrusel')
  async getCarruselMago(@Param('slug') slug: string) {
    return this.imagenesService.getImagenesByMagoAndTipo(slug, 'carousel');
  }

  @Get('mago/:slug/show')
  async getShowMago(@Param('slug') slug: string) {
    return this.imagenesService.getImagenesByMagoAndTipo(slug, 'show');
  }

  @Get('mago/:slug/:tipo')
  async getImagenesByTipo(@Param('slug') slug: string, @Param('tipo') tipo: string) {
    return this.imagenesService.getImagenesByMagoAndTipo(slug, tipo);
  }

  @Get(':id')
  async getImagenById(@Param('id') id: string, @Res() res: Response) {
    const imagen = await this.imagenesService.getImagenById(parseInt(id));
    
    if (!imagen) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }

    // Configurar headers para la imagen
    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Length': imagen.imagen.length,
      'Cache-Control': 'public, max-age=31536000', // Cache por 1 año
    });

    // Enviar la imagen como buffer
    return res.send(imagen.imagen);
  }
} 