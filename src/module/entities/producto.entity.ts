import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from './categoria.entity';
import { Proveedor } from './proveedor.entity';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  codigo: string;
  @ManyToOne(() => Proveedor, (proveedor) => proveedor.productos)
  @JoinColumn({ name: 'fk_ruc', referencedColumnName: 'ruc' }) // Ajustado para reflejar el nombre de la columna y la referencia
  fk_ruc: Proveedor;
    @Column()
    nombre:string;
    @Column()
    modelo:string;
    @Column()
    descripcion:string;
    @ManyToOne(() => Categoria, (categoria) => categoria.productos)
    @JoinColumn({ name: 'fk_categoria', referencedColumnName: 'id_categoria' }) // Ajustado para reflejar el nombre de la columna y la referencia
    fk_categoria: Categoria;
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
}