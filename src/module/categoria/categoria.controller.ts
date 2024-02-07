import { Controller, Get, Post, Put, Body, Param, NotFoundException, Delete } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaDto } from '../dto/categoria.dto';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}
  @Get()
  findAll() {
    return this.categoriaService.findAll();
  }
  @Post('nuevo')
  create(@Body() categoriaDto: CategoriaDto) {
    return this.categoriaService.create(categoriaDto);
  }
  @Put('update/:id')
  async update(@Param('id') id: number, @Body() categoriaDto: CategoriaDto) {
    try {
      const updatedCategoria = await this.categoriaService.update(id, categoriaDto);
      return { message: 'Categoría actualizada exitosamente', categoria: updatedCategoria };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    try {
      await this.categoriaService.delete(id);
      return { message: 'Categoría eliminada exitosamente' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}

