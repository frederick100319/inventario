import { Module } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { ProveedorController } from './proveedor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedor } from '../entities/proveedor.entity';
import { Ciudad } from '../entities/ciudad.entity';
import { Productos } from '../entities/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proveedor, Ciudad, Productos])],
  providers: [ProveedorService],
  controllers: [ProveedorController]
})
export class ProveedorModule {}
