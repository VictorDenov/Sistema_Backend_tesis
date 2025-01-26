import { PayloadInterface, PayloadInterfaceDocente, PayloadInterfaceEstudiante } from './payload.interface';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/Sistema_A/usuarios/entities/usuario.entity';
import { Role } from 'src/Sistema_A/roles/entities/role.entity';
import { RolRepository } from 'src/Sistema_A/roles/roles.repository';
import { MessageDto } from 'src/common/message.dto';
import { Docente } from 'src/Sistema_A/usuarios/components/docentes/entities/docente.entity';
import { Estudiante } from 'src/Sistema_A/usuarios/components/estudiantes/entities/estudiante.entity';
import { LoginUsuarioDto } from './dto/login.dto';
import { NombreRoles } from 'src/Sistema_A/roles/roles.enum';
import { TokenDto } from './dto/token.dto';
import { compare } from 'bcrypt';
import { LoginEstudianteDto } from './dto/login-estudiante';

import { AuthRepository } from './auth.repository';
import { DocenteRepository } from 'src/Sistema_A/usuarios/components/docentes/docentes.repository';
import { EstudiantesRepository } from 'src/Sistema_A/usuarios/components/estudiantes/estudiantes.repository';
import { LoginDocenteDto } from './dto/login-docente';




@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Role)
    private readonly rolRepository: RolRepository,
    @InjectRepository(Usuario)
    private readonly authRepository: AuthRepository,
    @InjectRepository(Docente)
    private readonly docenteRepository: DocenteRepository,
    @InjectRepository(Estudiante)
    private readonly authRepositoryEstudiante: EstudiantesRepository,
    private readonly jwtService: JwtService,
  ) {}

  // Obtener todos los usuarios
  async getall(): Promise<Usuario[]> {
    const usuarios = await this.authRepository.find();
    if (!usuarios.length) throw new NotFoundException(new MessageDto('No hay usuarios en la lista'));
    return usuarios;
  }

  // Login para el usuario
  async login(dto: LoginUsuarioDto): Promise<any> {
    const usuario = await this.findUserByEmailOrUsername(dto.nombreUsuario);
    if (!usuario) throw new UnauthorizedException(new MessageDto('No existe el usuario'));
    
    const passwordOK = await compare(dto.password, usuario.password);
    if (!passwordOK) throw new UnauthorizedException(new MessageDto('Contraseña errónea'));

    const payload: PayloadInterface = this.createUserPayload(usuario);
    const token = await this.jwtService.sign(payload);
    return { token };
  }

  // Login para el docente
  async logindocente(dto: LoginDocenteDto): Promise<any> {
    const docente = await this.findDocenteByEmailOrName(dto.nombreDocente);
    if (!docente) throw new UnauthorizedException(new MessageDto('No existe el docente'));

    const passwordOK = await compare(dto.password, docente.password);
    if (!passwordOK) throw new UnauthorizedException(new MessageDto('Contraseña errónea'));

    const payload: PayloadInterfaceDocente = this.createDocentePayload(docente);
    const token = await this.jwtService.sign(payload);
    return { token };
  }

  // Login para el estudiante
  async loginestudiante(dto: LoginEstudianteDto): Promise<any> {
    const estudiante = await this.findEstudianteByEmailOrName(dto.nombreEstudiante);
    if (!estudiante) throw new UnauthorizedException(new MessageDto('No existe el estudiante'));

    const passwordOK = await compare(dto.password, estudiante.password);
    if (!passwordOK) throw new UnauthorizedException(new MessageDto('Contraseña errónea'));

    const payload: PayloadInterfaceEstudiante = this.createEstudiantePayload(estudiante);
    const token = await this.jwtService.sign(payload);
    return { token };
  }

  // Refresh token
  async refresh(dto: TokenDto): Promise<any> {
    const usuario = await this.jwtService.decode(dto.token);
    const payload: PayloadInterface = {
      id: usuario[`id`],
      nombreUsuario: usuario[`nombreUsuario`],
      email: usuario[`email`],
      roles: usuario[`roles`],
    };
    const token = await this.jwtService.sign(payload);
    return { token };
  }

  // Buscar un usuario por nombre de usuario o email
  private async findUserByEmailOrUsername(nombreUsuario: string): Promise<Usuario> {
    return this.authRepository.findOne({ where: [{ nombreUsuario }, { email: nombreUsuario }] });
  }

  // Buscar un docente por nombre o email
  private async findDocenteByEmailOrName(nombreDocente: string): Promise<Docente> {
    return this.docenteRepository.findOne({ where: [{ Primernombre: nombreDocente }, { email: nombreDocente }] });
  }

  // Buscar un estudiante por nombre o email
  private async findEstudianteByEmailOrName(nombreEstudiante: string): Promise<Estudiante> {
    return this.authRepositoryEstudiante.findOne({ where: [{ nombres: nombreEstudiante }, { email: nombreEstudiante }] });
  }

  // Crear payload para el usuario
  private createUserPayload(usuario: Usuario): PayloadInterface {
    return {
      id: usuario.id,
      nombreUsuario: usuario.nombreUsuario,
      email: usuario.email,
      roles: usuario.roles.map(rol => rol.rolNombre),
    };
  }

  // Crear payload para el docente
  private createDocentePayload(docente: Docente): PayloadInterfaceDocente {
    return {
      id: docente.id,
      nombreDocente: docente. Primernombre,
      emailDocente: docente.email,
      roles: docente.roles.map(rol => rol.rolNombre),
    };
  }

  // Crear payload para el estudiante
  private createEstudiantePayload(estudiante: Estudiante): PayloadInterfaceEstudiante {
    return {
      id: estudiante.id,
      nombresestudiantes: estudiante.nombres,
      emaileEstudiante: estudiante.email,
      roles: estudiante.roles.map(rol => rol.rolNombre),
    };
  }
}