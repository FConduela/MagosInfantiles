import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UploadedFile, UseInterceptors, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('noticias')
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('editor', 'admin')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads/noticias',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async create(@Body() createNoticiaDto: CreateNoticiaDto, @Request() req, @UploadedFile() file: Express.Multer.File) {
    try {
      console.log('Creando noticia con datos:', createNoticiaDto);
      console.log('Usuario:', req.user);
      console.log('Archivo:', file);

      if (!req.user || !req.user.userId) {
        throw new UnauthorizedException('Usuario no autenticado');
      }

      if (!createNoticiaDto.titulo || !createNoticiaDto.contenido || !createNoticiaDto.fecha || !createNoticiaDto.hora || !createNoticiaDto.lugar) {
        throw new BadRequestException('Todos los campos son requeridos');
      }

      const noticia = await this.noticiasService.create(createNoticiaDto, req.user.userId, file);
      console.log('Noticia creada:', noticia);
      return noticia;
    } catch (error) {
      console.error('Error al crear noticia:', error);
      throw error;
    }
  }

  @Get()
  async findAll() {
    return this.noticiasService.findAll();
  }

  @Get('pendientes')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async findPendientes() {
    return this.noticiasService.findPendientes();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.noticiasService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('editor', 'admin')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads/noticias',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string, 
    @Body() updateNoticiaDto: UpdateNoticiaDto,
    @Request() req,
    @UploadedFile() file: Express.Multer.File
  ) {
    try {
      if (!req.user || !req.user.userId) {
        throw new UnauthorizedException('Usuario no autenticado');
      }

      // Verificar si el usuario es admin
      const isAdmin = req.user.role === 'admin';
      
      // Si no es admin, verificar que la noticia no esté pendiente
      if (!isAdmin) {
        const noticia = await this.noticiasService.findOne(+id);
        if (!noticia) {
          throw new BadRequestException('Noticia no encontrada');
        }
        if (noticia.estado === 'pendiente') {
          throw new UnauthorizedException('No tienes permiso para editar noticias pendientes');
        }
      }

      return this.noticiasService.update(+id, updateNoticiaDto, file);
    } catch (error) {
      console.error('Error al actualizar noticia:', error);
      throw error;
    }
  }

  @Patch(':id/aprobar')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async aprobarNoticia(@Param('id') id: string, @Request() req) {
    return this.noticiasService.aprobarNoticia(+id, req.user.userId);
  }

  @Patch(':id/rechazar')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async rechazarNoticia(@Param('id') id: string, @Request() req) {
    return this.noticiasService.rechazarNoticia(+id, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async remove(@Param('id') id: string, @Request() req) {
    try {
      if (!req.user || !req.user.userId) {
        throw new UnauthorizedException('Usuario no autenticado');
      }

      // Verificar si el usuario es admin
      const isAdmin = req.user.role === 'admin';
      
      if (!isAdmin) {
        throw new UnauthorizedException('No tienes permiso para eliminar noticias');
      }

      return this.noticiasService.remove(+id);
    } catch (error) {
      console.error('Error al eliminar noticia:', error);
      throw error;
    }
  }
} 