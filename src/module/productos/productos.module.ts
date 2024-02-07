import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from '../entities/categoria.entity';
import { Producto } from '../entities/producto.entity';
import { Proveedor } from '../entities/proveedor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria, Producto, Proveedor])],
  providers: [ProductosService],
  controllers: [ProductosController]
})
export class ProductosModule {}
