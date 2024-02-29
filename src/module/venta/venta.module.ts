import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedor } from '../entities/proveedor.entity';
import { Ciudad } from '../entities/ciudad.entity';
import { Productos } from '../entities/producto.entity';
import { Venta } from '../entities/venta.entity';
import { Cliente } from '../entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Productos, Venta, Cliente])],
  providers: [],
  controllers: []
})
export class VentaModule {}
