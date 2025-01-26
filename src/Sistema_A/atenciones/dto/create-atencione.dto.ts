import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAtencioneDto {
  
    @IsInt()
    @IsNotEmpty()
    docenteId: number;
  
    @IsInt()
    @IsNotEmpty()
    estudianteId: number;
  
    @IsString()
    @IsNotEmpty()
    tipoConsulta: string;
  
    @IsString()
    @IsNotEmpty()
    descripcion: string;
  
    @IsOptional()
    atendido: boolean;  // 
}
