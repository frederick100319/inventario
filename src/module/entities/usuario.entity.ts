import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, JoinColumn } from 'typeorm';
import { Rol } from './rol.entity';


@Entity()
export class Usuario {
  @PrimaryColumn()
  cedula: string;

  @Column()
  nombre: string;
  @Column()
  apellido: string;
  @Column()
  email: string;
  @Column()
  contrasena: string;
  @ManyToOne(() => Rol, (rol) => rol.usuario)
  @JoinColumn({ name: 'fk_rol', referencedColumnName: 'id_rol' }) // Ajustado para reflejar el nombre de la columna y la referencia
  fk_rol: number;
}