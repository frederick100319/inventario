import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { ProveedorDto } from '.././dto/proveedor.dto';

@Controller('proveedor')
export class ProveedorController {
  constructor(private readonly proveedorService: ProveedorService) {}

  @Get()
  async findAll() {
    return this.proveedorService.findAll();
  }

  @Get('total')
  async getTotalCities(): Promise<number> {
    return await this.proveedorService.getTotalSuppliers();
  }

  @Get(':ruc')
  async findOne(@Param('ruc') ruc: string) {
    return this.proveedorService.findOne(ruc);
  }

  @Post()
  async create(@Body() proveedorDto: ProveedorDto) {
    return this.proveedorService.create(proveedorDto);
  }

  @Put(':ruc')
  async update(@Param('ruc') ruc: string, @Body() proveedorDto: ProveedorDto) {
    return this.proveedorService.update(ruc, proveedorDto);
  }

  @Delete(':ruc')
  async remove(@Param('ruc') ruc: string) {
    return this.proveedorService.remove(ruc);
  }
}

