import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Venta } from './venta.entity';


@Entity()
export class Cliente {
    @PrimaryColumn()
    id_cliente:number
    @OneToMany(()=>Venta, (venta)=>venta.fk_cliente)
    venta:Venta[]
}