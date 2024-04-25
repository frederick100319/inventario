import { Module } from '@nestjs/common';
import { SerialService } from './serial.service';
import { SerialController } from './serial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seriales } from '../entities/serial.entity';
import { Productos } from '../entities/producto.entity';
import { Venta } from '../entities/venta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seriales, Productos, Venta])],
  providers: [SerialService],
  controllers: [SerialController]
})
export class SerialModule {}
