import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Cliente } from './cliente.entity';
import { Productos } from './producto.entity';

@Entity()
export class Venta {
  @PrimaryColumn()
  id_venta: number;
  @ManyToOne(() => Productos, (producto) => producto.venta)
  @JoinColumn({ name: 'fk_codigo', referencedColumnName: 'codigo' }) // Ajustado para reflejar el nombre de la columna y la referencia
  fk_codigo: Productos;
  @ManyToOne(() => Cliente, (cliente) => cliente.venta)
  @JoinColumn({ name: 'fk_cliente', referencedColumnName: 'id_cliente' }) // Ajustado para reflejar el nombre de la columna y la referencia
  fk_cliente: Cliente;

}