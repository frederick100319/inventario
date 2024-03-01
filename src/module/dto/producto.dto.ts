

export class ProductoDto{
    readonly codigo: string;
    readonly fk_ruc: string;
    readonly nombre: string;
    readonly modelo: string;
    readonly descripcion: string;
    readonly fk_categoria: number;
    readonly cantidad: number;
    readonly disponible: boolean;
    readonly precio_compra: number;
    readonly precio_venta: number;
    readonly foto_url:string; 
}