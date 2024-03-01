import { IsEmail } from 'class-validator';
export class ClienteDto{
    id_cliente:number;
    fk_persona:number;
    cedula_ruc:string;
    nombre:string;
    apellido:string;
    nombre_empresa:string;
    calle_1:string;
    nro_casa:string;
    calle_2:string;
    @IsEmail()
    email:string;
    celular:string;
    fk_ciudad:number;
}