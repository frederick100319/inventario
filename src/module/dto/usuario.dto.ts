import { IsEmail, IsStrongPassword } from 'class-validator';
import { Rol } from '../entities/rol.entity';

export class UsuarioDto{
    cedula:string;
    nombre:string;
    apellido:string;
    @IsEmail()
    email:string;
    @IsStrongPassword()
    contrasena:string;
    fk_rol:number;
    resetToken:string;
    resetTokenExpira:Date;

}