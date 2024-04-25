import { City } from "./city";
export interface Supplier {
    ruc: string;
    empresa: string;
    calle_1:string;
    nro_casa:string;
    calle_2:string;
    encargado:string;
    nro_encargado:string;
    disponible:boolean
    fk_ciudad:City;
}