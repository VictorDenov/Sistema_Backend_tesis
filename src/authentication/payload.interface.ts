export interface PayloadInterface {
    id: number;
    nombreUsuario: string;
    email: string;
    roles: string[];
}


export interface PayloadInterfaceDocente {
    id: number;
    nombreDocente: string;
    emailDocente: string;
    roles: string[];
}


export interface PayloadInterfaceEstudiante {
    id: number;
    nombresestudiantes: string;
    emaileEstudiante: string;
    roles: string[];
}