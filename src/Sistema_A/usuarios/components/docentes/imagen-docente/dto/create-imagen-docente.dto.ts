import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateImagenDocenteDto {

  @IsString()
  @IsNotEmpty()
  public_id: string;  // public_id de la imagen en Cloudinary

  @IsString()
  @IsNotEmpty()
  url: string;  // URL de la imagen (la URL obtenida de Cloudinary)

  @IsInt()
  @IsNotEmpty()
  docenteId: number;  // Relación con el Docente (el ID del docente que tendrá la imagen)
}
