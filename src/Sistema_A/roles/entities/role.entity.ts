import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { NombreRoles } from "../roles.enum";
import { Usuario } from "src/Sistema_A/usuarios/entities/usuario.entity";
import { Docente } from "src/Sistema_A/usuarios/components/docentes/entities/docente.entity";
import { Estudiante } from "src/Sistema_A/usuarios/components/estudiantes/entities/estudiante.entity";

@Entity({name:'rol'})

export class Role {

    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({type: 'varchar', length: 10, nullable: false, unique: true})
    rolNombre: NombreRoles;

    @ManyToMany(type => Usuario, usuario => usuario.roles)
    usuarios: Usuario[];

    @ManyToMany(type => Docente, docente => docente.roles)
    Docente: Docente[];

    @ManyToMany(type => Estudiante, estudiante => estudiante.roles)
    Estudiante: Estudiante[];
}
