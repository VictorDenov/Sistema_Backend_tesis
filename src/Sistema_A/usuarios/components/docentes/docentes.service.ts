import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { NombreRoles } from "./../../../roles/roles.enum";
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/Sistema_A/roles/entities/role.entity';
import { RolRepository } from 'src/Sistema_A/roles/roles.repository';
import { Usuario } from '../../entities/usuario.entity';
import { DocenteRepository } from './docentes.repository';
import { MessageDto } from 'src/common/message.dto';
import { Docente } from './entities/docente.entity';
import { Repository } from 'typeorm';
import { Carrera } from 'src/Sistema_A/carreras/entities/carrera.entity';
import { AtencionEstudiante } from 'src/Sistema_A/atenciones/entities/atencione.entity';
import { ImagenDocente } from './imagen-docente/entities/imagen-docente.entity';
import { CarreraRepository } from 'src/Sistema_A/carreras/carreras.repository';

@Injectable()
export class DocentesService {

    constructor(
      @InjectRepository(Docente) private readonly docenteRepository: Repository<Docente>,
      @InjectRepository(Role) private readonly rolRepository: Repository<Role>,
      @InjectRepository(Carrera) private readonly carreraRepository: Repository<Carrera>,
      @InjectRepository(AtencionEstudiante) private readonly atencionEstudianteRepository: Repository<AtencionEstudiante>,
      @InjectRepository(ImagenDocente) private readonly imagenDocenteRepository: Repository<ImagenDocente>,
  ) {
  
  }
  
  async getall(): Promise<Docente[]> {
    const docentes = await this.docenteRepository.find({
      relations: ['carrera', 'imagenes'],  // Cargar las relaciones de carrera e imagenes
    });
  
    if (!docentes.length) {
      throw new NotFoundException(new MessageDto('No hay Docentes en la lista'));
    }
  
    return docentes;
  }
  
  async create(dto: CreateDocenteDto): Promise<Docente> {
    const { primernombre, email, carreraId, atencionesEstudiantes, imagenes } = dto;

    // Verificar si el docente ya existe
    const exists = await this.docenteRepository.findOne({ where: [{Primernombre: primernombre }, { email }] });
    if (exists) {
      throw new BadRequestException(new MessageDto('El Docente ya está registrado'));
    }

    // Verificar si el rol de docente existe
    const rolDocente = await this.rolRepository.findOne({ where: { rolNombre: NombreRoles.DOCENTE } });
    if (!rolDocente) {
      throw new InternalServerErrorException(new MessageDto('El rol de docente no ha sido creado'));
    }

    // Crear la entidad docente
    const docente = this.docenteRepository.create(dto);
    docente.roles = [rolDocente];

    // Asignar carrera si existe
    if (carreraId) {
      const carrera = await this.carreraRepository.findOne({ where: { id: carreraId } });
      if (!carrera) {
        throw new BadRequestException(new MessageDto('Carrera no encontrada'));
      }
      docente.carrera = carrera;
    }

    // Guardar atenciones si existen
    if (atencionesEstudiantes && atencionesEstudiantes.length > 0) {
      docente.atencionesEstudiantes = await this.atencionEstudianteRepository.save(atencionesEstudiantes);
    }

    // Guardar imágenes si existen
    if (imagenes && imagenes.length > 0) {
      docente.imagenes = await this.imagenDocenteRepository.save(imagenes);
    }

    // Guardar el docente en la base de datos
    await this.docenteRepository.save(docente);
    return docente;
  }
  
  
}
