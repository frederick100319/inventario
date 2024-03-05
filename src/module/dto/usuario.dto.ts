import { IsEmail, IsStrongPassword } from 'class-validator';

export class UsuarioDto{
    cedula:string;
    nombre:string;
    apellido:string;
    @IsEmail()
    email:string;
    @IsStrongPassword()
    contrasena:string;
    fk_rol:number;

}