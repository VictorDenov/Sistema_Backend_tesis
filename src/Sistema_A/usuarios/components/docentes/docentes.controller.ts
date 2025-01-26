import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, BadRequestException, UploadedFiles } from '@nestjs/common';
import { DocentesService } from './docentes.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagenDocente } from './imagen-docente/entities/imagen-docente.entity';
import { CloudinaryStorageService } from 'src/Sistema_A/servicesCloudinary/cloudinaryStorageService';
import { CreateImagenDocenteDto } from './imagen-docente/dto/create-imagen-docente.dto';
import { CreateAtencioneDto } from 'src/Sistema_A/atenciones/dto/create-atencione.dto';
import { MessageDto } from 'src/common/message.dto';

@Controller('docentes')
export class DocentesController {
  constructor(private readonly docentesService: DocentesService) {}

  
    @Get('/lista')
    getAll() {
        return this.docentesService.getall();
    }
  
    @Post('create')
    @UseInterceptors(FileInterceptor('imagenes', { storage: CloudinaryStorageService.storage }))
    async createDocente(
      @Body() createDocenteDto: CreateDocenteDto,  // Recibe el DTO para el docente
      @UploadedFile() file: Express.Multer.File,  // Recibe un archivo de imagen
    ) {
      if (!file) {
        throw new BadRequestException('No se ha recibido ninguna imagen');
      }
  
      const { atencionesEstudiantes, imagenes, ...rest } = createDocenteDto;
  
      // Procesar la imagen: Enviar el archivo de imagen a Cloudinary y obtener su URL
      const processedImage = new CreateImagenDocenteDto();
      processedImage.url = file.path;
      processedImage.public_id = file.filename;
  
      // Crear el docente con los datos y relaciones
      const docente = await this.docentesService.create({
        ...rest, 
        imagenes: [processedImage],  // Envía la imagen procesada
      });
  
      return new MessageDto('Docente creado correctamente');
    }
    
}
