import { Module } from '@nestjs/common';
import { AtencionesService } from './atenciones.service';
import { AtencionesController } from './atenciones.controller';
import { AtencionEstudiante } from './entities/atencione.entity';
import { Docente } from '../usuarios/components/docentes/entities/docente.entity';
import { Estudiante } from '../usuarios/components/estudiantes/entities/estudiante.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
   imports: [TypeOrmModule.forFeature([AtencionEstudiante,Docente,Estudiante])],
  controllers: [AtencionesController],
  providers: [AtencionesService],
})
export class AtencionesModule {}
