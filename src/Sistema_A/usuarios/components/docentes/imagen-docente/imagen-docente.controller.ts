import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImagenDocenteService } from './imagen-docente.service';
import { CreateImagenDocenteDto } from './dto/create-imagen-docente.dto';
import { UpdateImagenDocenteDto } from './dto/update-imagen-docente.dto';

@Controller('imagen-docente')
export class ImagenDocenteController {
  constructor(private readonly imagenDocenteService: ImagenDocenteService) {}

  @Post()
  create(@Body() createImagenDocenteDto: CreateImagenDocenteDto) {
    return this.imagenDocenteService.create(createImagenDocenteDto);
  }

  @Get()
  findAll() {
    return this.imagenDocenteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagenDocenteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImagenDocenteDto: UpdateImagenDocenteDto) {
    return this.imagenDocenteService.update(+id, updateImagenDocenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagenDocenteService.remove(+id);
  }
}
