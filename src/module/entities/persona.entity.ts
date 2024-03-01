import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Venta } from './venta.entity';
import { Cliente } from './cliente.entity';


@Entity()
export class Persona {
    @PrimaryGeneratedColumn()
    id_persona:number
    @Column()
    nombre:string;
    @OneToMany(()=>Cliente, (cliente)=>cliente.fk_persona)
    cliente:Cliente[]
}