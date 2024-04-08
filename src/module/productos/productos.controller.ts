import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductoService } from '../productos/productos.service';
import { ProductoDto } from '../dto/producto.dto';
import { Productos } from '../entities/producto.entity';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  async create(@Body() productoDto: ProductoDto): Promise<Productos> {
    return this.productoService.create(productoDto);
  }

  @Get()
  async findAll(): Promise<Productos[]> {
    return this.productoService.findAll();
  }
  @Get('total')
  async getTotalAvailableProducts(): Promise<number> {
    return await this.productoService.getTotalAvailableProducts();
  }
  @Get(':codigo')
  async findOne(@Param('codigo') codigo: string): Promise<Productos | undefined> {
    return this.productoService.findOne(codigo);
  }

  @Put(':codigo')
  async update(@Param('codigo') codigo: string, @Body() productoDto: ProductoDto): Promise<Productos | undefined> {
    return this.productoService.update(codigo, productoDto);
  }

  @Delete(':codigo')
  async remove(@Param('codigo') codigo: string): Promise<Productos | undefined> {
    return this.productoService.remove(codigo);
  }

}
