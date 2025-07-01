import { Module } from '@nestjs/common';
import { MagosController } from './magos.controller';
import { MagosService } from './magos.service';
import { ImagenesController } from './imagenes.controller';
import { ImagenesService } from './imagenes.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MagosController, ImagenesController],
  providers: [MagosService, ImagenesService],
})
export class MagosModule {} 