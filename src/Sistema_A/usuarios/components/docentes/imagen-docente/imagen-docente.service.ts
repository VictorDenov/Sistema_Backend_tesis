import { Injectable } from '@nestjs/common';
import { CreateImagenDocenteDto } from './dto/create-imagen-docente.dto';
import { UpdateImagenDocenteDto } from './dto/update-imagen-docente.dto';

@Injectable()
export class ImagenDocenteService {
  create(createImagenDocenteDto: CreateImagenDocenteDto) {
    return 'This action adds a new imagenDocente';
  }

  findAll() {
    return `This action returns all imagenDocente`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imagenDocente`;
  }

  update(id: number, updateImagenDocenteDto: UpdateImagenDocenteDto) {
    return `This action updates a #${id} imagenDocente`;
  }

  remove(id: number) {
    return `This action removes a #${id} imagenDocente`;
  }
}
