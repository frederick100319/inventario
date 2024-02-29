import { Module } from '@nestjs/common';
import { CategoriaController } from './categoria.controller';
import { CategoriaService } from './categoria.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from '../entities/categoria.entity';
import { Productos } from '../entities/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria, Productos])],
  controllers: [CategoriaController],
  providers: [CategoriaService]
})
export class CategoriasModule {}
