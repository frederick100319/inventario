import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from '../entities/venta.entity';
import { Cliente } from '../entities/cliente.entity';
import { Productos } from '../entities/producto.entity';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { Persona } from '../entities/persona.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Venta, Productos, Persona])],
  providers: [ClienteService],
  controllers: [ClienteController]
})
export class ClienteModule {}
