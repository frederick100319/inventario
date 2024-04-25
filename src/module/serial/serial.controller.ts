import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SerialService } from './serial.service';
import { Seriales } from '../entities/serial.entity';
import { SerialDto } from '../dto/serial.dto';

@Controller('seriales')
export class SerialController {
  constructor(private readonly serialService: SerialService) {}

  @Post()
  async create(@Body() serialData: SerialDto): Promise<Seriales> {
    return this.serialService.create(serialData);
  }
  
  @Get()
  async findAll(): Promise<Seriales[]> {
    return this.serialService.findAll();
  }

  @Get('total')
  async getTotalSeriales(): Promise<number> {
    return await this.serialService.getTotalSeriales();
  }
  @Get(':id')
  async findOne(@Param('id') id_serial: number): Promise<Seriales> {
    return this.serialService.findOne(id_serial);
  }

  @Put(':id')
  async update(@Param('id') id_serial: number, @Body() serialData: SerialDto): Promise<Seriales> {
    return this.serialService.update(id_serial, serialData);
  }

  @Delete(':id')
  async remove(@Param('id') id_serial: number): Promise<void> {
    return this.serialService.remove(id_serial);
  }
}

