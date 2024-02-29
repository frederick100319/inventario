import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Productos } from './producto.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column()
  nombre: string;

  @OneToMany(()=>Productos, (productos)=>productos.fk_categoria)
  productos:Productos[]
}