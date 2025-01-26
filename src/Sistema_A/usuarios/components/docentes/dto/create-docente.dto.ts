import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { IsNotBlank } from "src/Sistema_A/decorators/is-not-blank.decorator";
import { CreateImagenDocenteDto } from "../imagen-docente/dto/create-imagen-docente.dto";
import { CreateAtencioneDto } from "src/Sistema_A/atenciones/dto/create-atencione.dto";

export class CreateDocenteDto {

    @IsString()
    @IsNotEmpty()
    primernombre: string;
  
    @IsString()
    @IsOptional()
    segundonombre: string;
  
    @IsString()
    @IsNotEmpty()
    primerApellido: string;
  
    @IsString()
    @IsNotEmpty()
    segundoApellido: string;
  
    @IsInt()
    @IsNotEmpty()
    cedula: number;
  
    @IsString()
    @IsNotEmpty()
    tituloTercerNivel: string;
  
    @IsString()
    @IsOptional()
    tituloPosgrado: string;
  
    @IsString()
    @IsNotEmpty()
    campus: string;
  
    @IsString()
    @IsNotEmpty()
    periodoAcademico: string;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
  
    @IsInt()
    @IsOptional()
    carreraId?: number; // Relación con la carrera
  
    // Relación con AtencionEstudiante
    @IsOptional()
    atencionesEstudiantes?: CreateAtencioneDto [];
  
    // Relación con ImagenDocente
    @IsOptional()
    imagenes?: CreateImagenDocenteDto[];
}
