import { Module } from '@nestjs/common';
import { ProductoService } from './productos.service';
import { ProductoController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from '../entities/categoria.entity';
import { Productos } from '../entities/producto.entity';
import { Proveedor } from '../entities/proveedor.entity';
import { Venta } from '../entities/venta.entity';
import { Cliente } from '../entities/cliente.entity';
import { Seriales } from '../entities/serial.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria, Productos, Proveedor, Venta, Cliente,Seriales])],
  providers: [ProductoService],
  controllers: [ProductoController]
})
export class ProductosModule {}
