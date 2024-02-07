import { Module } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CiudadController } from './ciudad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedor } from '../entities/proveedor.entity';
import { Ciudad } from '../entities/ciudad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proveedor, Ciudad])],
  providers: [CiudadService],
  controllers: [CiudadController]
})
export class CiudadModule {}
