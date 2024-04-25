import { Ciudad } from "../entities/ciudad.entity";

export class ProveedorDto{
    readonly ruc:string;
    readonly empresa:string;
    readonly calle_1:string;
    readonly nro_casa:string;
    readonly calle_2:string;
    readonly encargado:string;
    readonly nro_encargado:string;
    readonly fk_ciudad:Ciudad;
    readonly disponible:boolean;
}