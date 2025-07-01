import { Module } from '@nestjs/common';
import { NoticiasController } from './noticias.controller';
import { NoticiasService } from './noticias.service';
import { PrismaModule } from '../prisma/prisma.module';
import { RolesGuard } from '../auth/guards/roles.guard';

@Module({
  imports: [PrismaModule],
  controllers: [NoticiasController],
  providers: [NoticiasService, RolesGuard],
  exports: [NoticiasService],
})
export class NoticiasModule {} 