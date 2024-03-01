import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from '../entities/cliente.entity';
import { Persona } from '../entities/persona.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Persona])],
})
export class PersonaModule {}
