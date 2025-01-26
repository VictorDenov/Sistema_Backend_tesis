import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Materia } from '../../../../materias/entities/materia.entity';
import { Semestre } from 'src/Sistema_A/semestres/entities/semestre.entity';
import { Carrera } from 'src/Sistema_A/carreras/entities/carrera.entity';
import { AtencionEstudiante } from 'src/Sistema_A/atenciones/entities/atencione.entity';
import { hash } from 'bcrypt';
import { Role } from 'src/Sistema_A/roles/entities/role.entity';
import { ImagenDocente } from '../imagen-docente/entities/imagen-docente.entity';

@Entity('docente')
export class Docente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  Primernombre: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  Segundonombre: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  PrimerApellido: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  SegundoApellido: string;

  @Column({ type: 'int', unique: true })
  Cedula: number;

  @Column({ type: 'varchar', length: 100 })
  TituloTercerNivel: string;


  @Column({ type: 'varchar', length: 100 })
  TituloPosgrado: string;

  @Column({ type: 'varchar', length: 100 })
  Campus: string;

  

  @Column({ type: 'varchar', length: 100 })
  PeriodoAcademico: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @OneToMany(() => AtencionEstudiante, (atencionEstudiante) => atencionEstudiante.docente)
  atencionesEstudiantes: AtencionEstudiante[];

  @ManyToOne(() => Carrera, (carrera) => carrera.docentes, { nullable: true })
  carrera: Carrera;

  @OneToMany(() => ImagenDocente, (imagen) => imagen.docente)
  imagenes: ImagenDocente[];  // Los docentes pueden tener múltiples imágenes

  @ManyToMany(type => Role, rol => rol.Docente, { eager: true })
  @JoinTable({
    name: 'doocente_rol',
    joinColumn: { name: 'Docente_id' },
    inverseJoinColumn: { name: 'rol_id' }
  })
  roles: Role[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPasword() {
    if (!this.password) return;
    this.password = await hash(this.password, 10);
  }

}
