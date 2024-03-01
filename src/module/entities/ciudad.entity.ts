import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Proveedor } from './proveedor.entity';
import { Cliente } from './cliente.entity';

@Entity()
export class Ciudad {
  @PrimaryColumn()
  id_ciudad: number;

  @Column()
  nombre: string;

  @OneToMany(()=>Proveedor, (proveedor)=>proveedor.fk_ciudad)
  proveedor:Proveedor[]
  @OneToMany(()=>Cliente, (cliente)=>cliente.fk_ciudad)
  cliente:Proveedor[]
}