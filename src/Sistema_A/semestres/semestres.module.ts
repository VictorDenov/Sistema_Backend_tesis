import { Module } from '@nestjs/common';
import { SemestresService } from './semestres.service';
import { SemestresController } from './semestres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Docente } from '../usuarios/components/docentes/entities/docente.entity';
import { DocenteRepository } from '../usuarios/components/docentes/docentes.repository';
import { Role } from '../roles/entities/role.entity';
import { Estudiante } from '../usuarios/components/estudiantes/entities/estudiante.entity';
import { AtencionEstudiante } from '../atenciones/entities/atencione.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AtencionEstudiante,Docente,Role,DocenteRepository,Estudiante])],
  controllers: [SemestresController],
  providers: [SemestresService],
})
export class SemestresModule {}
