import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Productos } from './producto.entity';
import { Venta } from './venta.entity';


@Entity()
export class Seriales {
  @PrimaryColumn()
  id_serial: number;
  @Column()
  nro_serial:string;
  @ManyToOne(() => Productos, (producto) => producto.seriales)
  @JoinColumn({ name: 'fk_producto', referencedColumnName: 'codigo' }) // Ajustado para reflejar el nombre de la columna y la referencia
  fk_producto: string;
  @Column()
  garantia:number;
  @Column()
  vendido:boolean
  @ManyToOne(() => Venta, (venta) => venta.seriales)
  @JoinColumn({ name: 'fk_venta', referencedColumnName: 'id_venta' }) // Ajustado para reflejar el nombre de la columna y la referencia
  fk_venta: number;
}