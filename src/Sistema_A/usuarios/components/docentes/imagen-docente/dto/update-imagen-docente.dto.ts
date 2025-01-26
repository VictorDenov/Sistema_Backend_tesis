import { PartialType } from '@nestjs/mapped-types';
import { CreateImagenDocenteDto } from './create-imagen-docente.dto';

export class UpdateImagenDocenteDto extends PartialType(CreateImagenDocenteDto) {}
