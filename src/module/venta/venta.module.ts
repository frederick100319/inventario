import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productos } from '../entities/producto.entity';
import { Venta } from '../entities/venta.entity';
import { Cliente } from '../entities/cliente.entity';
import { VentaController } from './venta.controller';
import { VentaService } from './venta.service';

@Module({
  imports: [TypeOrmModule.forFeature([Productos, Venta, Cliente])],
  providers: [VentaService],
  controllers: [VentaController]
})
export class VentaModule {}
