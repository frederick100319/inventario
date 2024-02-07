import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Producto } from './producto.entity';
import { Ciudad } from './ciudad.entity';

@Entity()
export class Proveedor {
  @PrimaryGeneratedColumn()
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
    @ManyToOne(() => Ciudad, (ciudad) => ciudad.proveedor)
    @JoinColumn({ name: 'fk_ciudad', referencedColumnName: 'id_ciudad' }) // Ajustado para reflejar el nombre de la columna y la referencia
    fk_ciudad: Ciudad;
    @OneToMany(()=>Producto, (producto)=>producto.fk_ruc)
    productos:Producto[]
}