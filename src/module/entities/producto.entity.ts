import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Categoria } from './categoria.entity';
import { Proveedor } from './proveedor.entity';
import { Venta } from './venta.entity';
import { Seriales } from './serial.entity';

@Entity()
export class Productos {
  @PrimaryColumn()
  codigo: string;
  @ManyToOne(() => Proveedor, (proveedor) => proveedor.productos)
  @JoinColumn({ name: 'fk_ruc', referencedColumnName: 'ruc' }) // Ajustado para reflejar el nombre de la columna y la referencia
  fk_ruc: string;
    @Column()
    nombre:string;
    @Column()
    modelo:string;
    @Column()
    descripcion:string;
    @ManyToOne(() => Categoria, (categoria) => categoria.productos)
    @JoinColumn({ name: 'fk_categoria', referencedColumnName: 'id_categoria' }) // Ajustado para reflejar el nombre de la columna y la referencia
    fk_categoria: number;
    @Column()
    cantidad:number;
    @Column()
    disponible:boolean;
    @Column()
    precio_compra:number;
    @Column()
    precio_venta:number;
    @Column()
    foto_url:string;
    @OneToMany(()=>Venta, (venta)=>venta.fk_codigo)
    venta:Venta[]
    @OneToMany(()=>Seriales,(seriales)=>seriales.fk_producto)
    seriales:Seriales[]
}