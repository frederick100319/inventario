import { Column, Entity, OneToMany, PrimaryColumn} from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity()
export class Rol {
  @PrimaryColumn()
  id_rol: number;

  @Column()
  nombre: string;

  @OneToMany(()=>Usuario, (usuario)=>usuario.fk_rol)
  usuario:Usuario[]

}