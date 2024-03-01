import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import { ClienteDto } from '../dto/cliente.dto';
import { Cliente } from '../entities/cliente.entity';
import { ClienteService } from './cliente.service';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() clienteDto: ClienteDto): Promise<Cliente> {
    return this.clienteService.create(clienteDto);
  }

  @Get()
  findAll(): Promise<Cliente[]> {
    return this.clienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Cliente> {
    return this.clienteService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id', ParseIntPipe) id: number, @Body() clienteDto: ClienteDto): Promise<Cliente> {
    return this.clienteService.update(id, clienteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.clienteService.remove(id);
  }
}

