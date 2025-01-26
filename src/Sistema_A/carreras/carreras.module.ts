import { Module } from '@nestjs/common';
import { CarrerasService } from './carreras.service';
import { CarrerasController } from './carreras.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrera } from './entities/carrera.entity';
import { AtencionEstudiante } from '../atenciones/entities/atencione.entity';
import { Docente } from '../usuarios/components/docentes/entities/docente.entity';
import { DocenteRepository } from '../usuarios/components/docentes/docentes.repository';
import { Estudiante } from '../usuarios/components/estudiantes/entities/estudiante.entity';
import { Role } from '../roles/entities/role.entity';
import { ImagenDocenteModule } from '../usuarios/components/docentes/imagen-docente/imagen-docente.module';

@Module({
  imports: [TypeOrmModule.forFeature([Carrera,Docente,Estudiante])],
  controllers: [CarrerasController],
  providers: [CarrerasService],
})
export class CarrerasModule {}
