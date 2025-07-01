import { IsString, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateNoticiaDto {
  @IsString()
  titulo: string;

  @IsString()
  contenido: string;

  @IsString()
  @IsOptional()
  imagen?: string;

  @IsString()
  fecha: string;

  @IsString()
  hora: string;

  @IsString()
  lugar: string;
} 