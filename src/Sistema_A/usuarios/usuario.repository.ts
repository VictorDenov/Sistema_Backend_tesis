import { Usuario } from './entities/usuario.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario> {
    
}