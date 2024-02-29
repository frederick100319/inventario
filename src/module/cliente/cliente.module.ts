import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from '../entities/venta.entity';
import { Cliente } from '../entities/cliente.entity';
import { Productos } from '../entities/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Venta, Productos])],
  providers: [],
  controllers: []
})
export class ClienteModule {}
