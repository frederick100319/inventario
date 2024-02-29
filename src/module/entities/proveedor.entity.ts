import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Productos } from './producto.entity';
import { Ciudad } from './ciudad.entity';

@Entity()
export class Proveedor {
  @PrimaryColumn()
    ruc: string;
    @Column()
    empresa:string;
    @Column()
    calle_1:string;
    @Column()
    nro_casa:string;
    @Column()
    calle_2:string;
    @Column()
    encargado:string;
    @Column()
    nro_encargado:string;
    @ManyToOne(() => Ciudad, (ciudad) => ciudad.proveedor)
    @JoinColumn({ name: 'fk_ciudad', referencedColumnName: 'id_ciudad' }) // Ajustado para reflejar el nombre de la columna y la referencia
    fk_ciudad: number;
    @Column()
    disponible:boolean
    @OneToMany(()=>Productos, (productos)=>productos.fk_ruc)
    productos:Productos[]
}