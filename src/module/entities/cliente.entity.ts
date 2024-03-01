import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Venta } from './venta.entity';
import { Persona } from './persona.entity';
import { Ciudad } from './ciudad.entity';


@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    id_cliente:number
    @ManyToOne(() => Persona, (persona) => persona.cliente)
    @JoinColumn({ name: 'fk_persona', referencedColumnName: 'id_persona' }) // Ajustado para reflejar el nombre de la columna y la referencia
    fk_persona: number;
    @Column()
    cedula_ruc:string;
    @Column()
    nombre:string;
    @Column()
    apellido:string;
    @Column()
    nombre_empresa:string;
    @Column()
    calle_1:string;
    @Column()
    nro_casa:string;
    @Column()
    calle_2:string;
    @Column()
    email:string;
    @Column()
    celular:string;
    @ManyToOne(() => Ciudad, (ciudad) => ciudad.cliente)
    @JoinColumn({ name: 'fk_ciudad', referencedColumnName: 'id_ciudad' }) // Ajustado para reflejar el nombre de la columna y la referencia
    fk_ciudad: number;
    @OneToMany(()=>Venta, (venta)=>venta.fk_cliente)
    venta:Venta[]
}