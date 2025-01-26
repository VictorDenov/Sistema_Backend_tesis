import { MaxLength } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class LoginEstudianteDto {
    @IsNotBlank({message: 'el nombre de usuario no puede estar vacío'})
    nombreEstudiante: string;

    @IsNotBlank({message: 'el nombre de usuario no puede estar vacío'})
    emailEstudiante: string;

    @IsNotBlank({message: 'la contraseña del usuario no puede estar vacía'})
    password: string;
}