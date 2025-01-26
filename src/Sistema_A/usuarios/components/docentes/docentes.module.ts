import { Module } from '@nestjs/common';
import { DocentesService } from './docentes.service';
import { DocentesController } from './docentes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../../entities/usuario.entity';
import { Role } from 'src/Sistema_A/roles/entities/role.entity';
import { DocenteRepository } from './docentes.repository';
import { Docente } from './entities/docente.entity';
import { ImagenDocenteModule } from './imagen-docente/imagen-docente.module';
import { Carrera } from 'src/Sistema_A/carreras/entities/carrera.entity';
import { ImagenDocente } from './imagen-docente/entities/imagen-docente.entity';
import { CloudinaryStorageService } from 'src/Sistema_A/servicesCloudinary/cloudinaryStorageService';
import { JwtService } from '@nestjs/jwt';
import { AtencionesModule } from 'src/Sistema_A/atenciones/atenciones.module';
import { AtencionEstudiante } from 'src/Sistema_A/atenciones/entities/atencione.entity';

@Module({
   imports: [TypeOrmModule.forFeature([Docente,Role,Carrera,ImagenDocente,AtencionEstudiante]),AtencionesModule],
  controllers: [DocentesController],
  providers: [DocentesService,JwtService,CloudinaryStorageService],
})
export class DocentesModule {}
