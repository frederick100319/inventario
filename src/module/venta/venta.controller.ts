import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { VentaDto } from '../dto/venta.dto';
import { VentaService } from './venta.service';

@Controller('ventas')
export class VentaController {
  constructor(private readonly ventaService: VentaService) {}

  @Post()
  async create(@Body() ventaDto: VentaDto) {
    return this.ventaService.create(ventaDto);
  }

  @Get()
  async findAll() {
    return this.ventaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.ventaService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() ventaDto: VentaDto) {
    return this.ventaService.update(id, ventaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.ventaService.remove(id);
  }
}

