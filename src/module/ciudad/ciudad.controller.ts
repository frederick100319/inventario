// ciudad.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CiudadDto } from '../dto/ciudad.dto';
import { Ciudad } from '../entities/ciudad.entity';

@Controller('ciudad')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Get()
  async findAll(): Promise<Ciudad[]> {
    return this.ciudadService.findAll();
  }

  @Post()
  async create(@Body() createCiudadDto: CiudadDto): Promise<Ciudad> {
    return this.ciudadService.create(createCiudadDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCiudadDto: CiudadDto): Promise<Ciudad> {
    return this.ciudadService.update(id, updateCiudadDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.ciudadService.remove(id);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Ciudad | null> {
    return this.ciudadService.findById(id);
  }
}



