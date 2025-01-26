import { Module } from '@nestjs/common';
import { ImagenDocenteService } from './imagen-docente.service';
import { ImagenDocenteController } from './imagen-docente.controller';
import { Docente } from '../entities/docente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocenteRepository } from '../docentes.repository';
import { Role } from 'src/Sistema_A/roles/entities/role.entity';
import { ImagenDocente } from './entities/imagen-docente.entity';

@Module({

    imports: [TypeOrmModule.forFeature([ImagenDocente,Docente,Role,DocenteRepository])],
  controllers: [ImagenDocenteController],
  providers: [ImagenDocenteService],
})
export class ImagenDocenteModule {}
